function(doc) {
  if (doc.prioriteit) {
    emit(doc.title, doc);
  }
};