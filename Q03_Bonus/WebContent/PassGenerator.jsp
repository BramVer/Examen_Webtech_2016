<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Geef een lengte op</title>
</head>
<body>
	
<form method="POST">
				<input type="text" name="length">Length
				<input type="submit" value="Kies">
</form>

<p><% 
	int l = Integer.parseInt(request.getParameterValues("length")[0]);
	double dirty = Math.pow(10,l-1);
	double pass = Math.floor((Math.random() *(dirty*10)) + dirty);
	String hexString = Integer.parseInt(pass).toString(16);%>

	
	
	<p><%=	hexString.substring(0, l); %></p>

		
</body>
</html>