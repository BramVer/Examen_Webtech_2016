var DB = "http://darm.cloudant.com/recipes/";
var VIEW = "_design/app/_view/recipeSearch?key=%22";

function searchPriority(){
	
	$('#content').empty();
    $('#content').append('<ul>');
    
	var pri = $('#priority').val();
	console.log(DB + VIEW + pri + "%22");
	$.ajax({
		type:	'GET',
		url:	DB + VIEW + pri + "%22",
	    async: true,
	    contentType: 'application/json',
	    dataType: 'jsonp',
	    success:function(data){
	        
	    	var rows = data.rows;
	        var prioriteiten = rows[0].value;
	    	$('#content').append('<li>' + prioriteiten);
	        ,
		error: function(XMLHttpRequest, textStatus, errorThrown) { alert(XMLHttpRequest.responseText); }
	});
}

function searchDoc(){
	var DB = "http://127.0.0.1/examen/";
	var VIEW = "_design/app/_view/searchTodo?key=%22";
	   
    var id = $("#todos").val();
    var docName = name.replace(/\s+/g, '');
    console.log(docName);
   
    $.ajax({
        type:    'GET',
        url:    DB + VIEW + id + "%22",
        async: true,
        success:function(data){
            var doc = JSON.parse(data);
            editDoc(docName, doc._rev, doc.beschrijving, doc.status, doc.prioriteit, doc.beginDatum, doc.eindDatum);
            $("#todos").val('');
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) { alert(XMLHttpRequest.responseText); }
    });   
}

function buildOutput(){

    $('#output').empty();
    var html = '<table class="table table-hover">';
    $.ajax({
        type : 'GET',
        url : '../../_all_docs?include_docs=true',
        async : true,
        success : function(data){
            var arr = JSON.parse(data).rows;

            for(var i = 0; i < arr.length; i++){

                if (arr[i].id.indexOf('_design') == -1){
                    var doc = arr[i].doc;
                    html += '<tr><td>' + doc.beschrijving + '</td><td>' + doc.status
                            + '</td><td>' + doc.prioriteit +  doc.beginDatum
                            + '</td><td>' + doc.eindDatum
                            + '</td><td>' +'</td>'
                            + '<td><button type="button" class="btn btn-danger" onClick="deleteDoc(\'' + doc._id + '\',\'' + doc._rev + '\')">X</button></td>'
                            + '<td><button type="button" class="btn btn-success" onClick="editDoc(\'' + doc._id + '\',\'' + doc._rev + '\',\'' + doc.beschrijving+ '\',\'' + doc.status + '\',\'' + doc.prioriteit + '\',\'' + doc.beginDatum + '\',\'' + doc.eindDatum + '\')">Edit</button></td>';
                }
            }
            html += '</table>';
            $('#output').html(html);
        },
        error : function(XMLHttpRequest, textStatus, errorThrown){
            console.log(errorThrown);
        }
    });
}

function deleteDoc(id, rev){
    $.ajax({
        type:     'DELETE',
        url:     '../../' + id + '?rev=' + rev,
        success: function(){
            fillTypeAhead();
            //buildOutput();
        },
        error:   function(XMLHttpRequest, textStatus, errorThrown) { console.log(errorThrown); }
    });
}

function editDoc(id, rev, beschrijving, status, prioriteit, beginDatum, eindDatum){
   
    $('#output').hide();
    $('#edit').show();
   
    var html = '';
   
    // Build edit form
    html += '<h3>Editeer record</h3><table class="table table-hover">';
    
    //Staan hidden omdat we die al opvragen, we gaan ze niet vragen ad user, die gaat die onmogelijk te weten kunnen komen.
    html += '<input type="hidden" id="_id" value="' + id + '"/>';
    html += '<input type="hidden" id="_rev" value="' + rev + '"/>';
    
    html += '<tr><td>Naam :</td><td><input id="beschrijving2" type="text" size="50" value="' + beschrijving + '"/></td></tr>';
    html += '<tr><td>Voornaam:</td><td><input id="status2" type="text" size="50" value="' + status + '"/></td></tr>';
    html += '<tr><td>Punten:</td><td><input id="prioriteit2" type="text" size="10" value="' + prioriteit + '"/></td></tr>';
    html += '<tr><td>Punten:</td><td><input id="beginDatum2" type="text" size="10" value="' + beginDatum + '"/></td></tr>';
    html += '<tr><td>Punten:</td><td><input id="eindDatum2" type="text" size="10" value="' + eindDatum + '"/></td></tr>';
    html += '<tr><td colspan="2" align="center"><button type="button" class="btn btn-primary" onClick="updateDoc()">Ok</button></td></tr>';
    html += '</table>';
   
    $('#edit').html(html);
}

function updateDoc(){
   
    var id = $("#_id").val();
    var rev = $("#_rev").val();
    var beschrijving = $("#beschrijving2").val();
    var status = $("#status2").val();
    var prioriteit = $("#prioriteit2").val();
    var beginDatum = $("#beginDatum2").val();
    var eindDatum = $("#eindDatum2").val();

    var doc = {};

    //IMPORTANT:
    doc._id = id;
    doc._rev = rev;
    
    doc.beschrijving = beschrijving;
    doc.status = status;
    doc.prioriteit = parseInt(prioriteit);
    doc.beginDatum = beginDatum;
    doc.eindDatum = eindDatum;
    var json = JSON.stringify(doc);

    $.ajax({
        type : 'PUT',
        url : '../../' + id,
        data : json,
        contentType : 'application/json',
        async : true,
        success : function(data){
            $('#edit').hide();
            $('#output').show();
            buildOutput();
        },
        error : function(XMLHttpRequest, textStatus, errorThrown){
            console.log(errorThrown);
        }
    });
}

   
$(document).ready(fillTypeAhead());