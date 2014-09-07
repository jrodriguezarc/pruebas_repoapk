var data_marca;
var data_codigo;
var data_descripcion;
var equals_tags = 0;
var busqueda;

$(document).ready(function(){
Parse.initialize("xLDpfEcs3rdyyELCIIbALY2RHmA7FVEsg2yth9mU","SGAuGwCUrYX49d10ZNgzDiUiLPhDrpNT5Byq4kdr");


  var Product = Parse.Object.extend("Producto");
  var query = new Parse.Query(Product);
  var text = "";
  var text2 = "";

  query.find({
    success: function(results) {
      for (var i = 0; i < results.length; i++) { 
    var object = results[i];
    var carPhoto = object.get("Imagenes");
		var descripcion = object.get("Descripcion");
		var titulo = object.get("Nombre");
		var id = object.id;
		var date = object.getUpdatedAt;
		var code = object.get("Codigo");
    var tagger = object.get("Tags");


//<-----------Obtención de tags------------------>

    var tag_list = '';
    var tag_creados = 0;
    var r= object.relation("Tags");


      r.query().find().then(function(tags){
        return query.find();
      }).then(function(tags) {
        for (var i = 0; i < tags.length; i++) { 
        var obj_json = JSON.stringify(tags[i]);
        var json = JSON.parse(obj_json);
        tag_list = tag_list + json["Nombre"] + ' ';
        }        
      }).then(function() {
      });


      console.log(tagger);
//<---------------------------------------------->


        text = text + 
		         '<div class="col-sm-4 portfolio-item">'+
                    '<a href="#' +  id +'" class="portfolio-link" data-toggle="modal">'+
                        '<div class="caption">'+
                            '<div class="caption-content">'+
                                '<i class="fa fa-search-plus fa-3x"></i>'+
                            '</div>'+
                        '</div>'+
                        '<img src=' + carPhoto.url() + ' class="img-responsive" alt="">'+
                    '</a>'+
                '</div>'	;  
				$("#var_img").html(text);
				
				
		text2 = text2 +		
		'<div class="portfolio-modal modal fade" id="'+id+'" tabindex="-1" role="dialog" aria-hidden="true">'+
       ' <div class="modal-content">'+
            '<div class="close-modal" data-dismiss="modal">'+
                '<div class="lr">'+
                    '<div class="rl">'+
                    '</div>'+
               ' </div>'+
           ' </div>'+
            '<div class="container">'+
               ' <div class="row">'+
                   ' <div class="col-lg-8 col-lg-offset-2">'+
                        '<div class="modal-body">'+
                            '<h2>'+titulo+'</h2>'+
                            '<hr class="star-primary">'+
                            '<img src="'+carPhoto.url()+'" class="img-responsive img-centered" alt="">'+
                            '<p>'+ descripcion +'</p>'+
                            '<ul class="list-inline item-details">' +
                                '<li>Creador:'+
                                    '<strong><a href="http://startbootstrap.com">Start Bootstrap</a>'+
                                    '</strong>'+
                                '</li>' +
                                '<li>Fecha:' +
                                   ' <strong><a href="http://startbootstrap.com">'+ date +'</a>' +
                                    '</strong>' +
                                '</li>' +
                                '<li>Codigo:' +
                                   ' <strong><a href="http://startbootstrap.com">'+ code +'</a>' +
                                    '</strong>' +
                                '</li>' +                                 
                           ' </ul>' +
                           '<ul class="list-inline item-details">' +
                           'Tags: <strong>'+ tagger  + '</strong>' +
                          ' </ul>' +
                           ' <button type="button" class="btn btn-default" data-dismiss="modal"><i class="fa fa-times"></i> Close</button>' +
                       ' </div>' +
                    '</div>' +
              ' </div>' +
            '</div>' +
        '</div>' +
    '</div>' ;
	
	$("#modulares").html(text2);



      }
    },
    error: function(error) {
      alert("Error: " + error.code + " " + error.message);
    }
  });

    




});
    function envio() {
      data_marca = document.getElementById("txt_marca").value ;
      data_codigo = document.getElementById("txt_codigo").value;
      data_descripcion = document.getElementById("txt_descripcion").value;


      Parse.initialize("xLDpfEcs3rdyyELCIIbALY2RHmA7FVEsg2yth9mU","SGAuGwCUrYX49d10ZNgzDiUiLPhDrpNT5Byq4kdr");

      var Product = Parse.Object.extend("Producto");
      var objproducto = new Product();
      var base64 = "V29ya2luZyBhdCBQYXJzZSBpcyBncmVhdCE=";

      var fileUploadControl = $("#myFile")[0];
      if (fileUploadControl.files.length > 0) {
        var file = fileUploadControl.files[0];
        var name = "photo.jpg";
        var parseFile = new Parse.File(name, file);
      }


      objproducto.set("Nombre", data_marca);
      objproducto.set("Codigo", data_codigo);
      objproducto.set("Descripcion", data_descripcion);
      objproducto.set("Imagenes", parseFile);
       
     
       objproducto.save(null, {
        success: function(objproducto) {
          alert('Nuevo objeto insertado con exito: ' + objproducto.id);
        },
        error: function(objproducto, error) {
          alert('Failed to create new object, with error code: ' + error.message);
        }
      });  

      var relation = objproducto.relation("Tags");
      var str_tags   = document.getElementById("txt_tags").value ;
      var tags_array = str_tags.split(" ");
      var len = tags_array.length;
      var tag = Parse.Object.extend("Tag");
      




      
      for (var i = 0; i < len; i++) {  
          var objtag = new tag();    
          objtag.set("Nombre", tags_array[i]);           
          name = tags_array[i]; 
          var query = new Parse.Query(tag);
          
          query.equalTo("Nombre",name);
          query.find({
            success: function(results) {              
              equals_tags = results.length;
            },
            error: function(error) {
              alert("Error: " + error.code + " " + error.message);
            }
          });

              if(equals_tags != 0){
               alert("VT Se encontraron iguales " + equals_tags + " record");
                  relation.add(object);
                  objproducto.save();
              }
              else
              {
                alert("NT Se encontraron iguales " + equals_tags + " record");
                    objtag.save(null, {
                    success: function(objtag) {
                      var relation = objproducto.relation("Tags");
                      relation.add(objtag);
                      objproducto.save();
                    },
                    error: function(objtag, error) {
                      alert('Failed to create new object, with error code: ' + error.message);
                    }
              }); 

              }
     }

    

   }





    function buscar() {


      var Product = Parse.Object.extend("Producto");
      var query = new Parse.Query(Product);
      busqueda = document.getElementById("txt_search").value ;
      query.contains("Descripcion",busqueda);
      query.contains("Nombre",busqueda);


      query.find().then(function(results){
      for (var i = 0; i < results.length; i++) { 
          var object = results[i];
          var titulo = object.get("Nombre");
          alert(titulo);
        }    
        return query.find(); 
      }).then(function(results) {
  var text = "";
  var text2 = "";
    for (var i = 0; i < results.length; i++) { 
        var object = results[i];
        var carPhoto = object.get("Imagenes");
        var descripcion = object.get("Descripcion");
        var titulo = object.get("Nombre");
        var id = object.id;
        var date = object.getUpdatedAt;
        var code = object.get("Codigo");
        var tagger = object.get("Tags");



            text = text + 
                 '<div class="col-sm-4 portfolio-item">'+
                        '<a href="#' +  id +'" class="portfolio-link" data-toggle="modal">'+
                            '<div class="caption">'+
                                '<div class="caption-content">'+
                                    '<i class="fa fa-search-plus fa-3x"></i>'+
                                '</div>'+
                            '</div>'+
                            '<img src=' + carPhoto.url() + ' class="img-responsive" alt="">'+
                        '</a>'+
                    '</div>'  ;  
            $("#var_img").html(text);
            
            
        text2 = text2 +   
        '<div class="portfolio-modal modal fade" id="'+id+'" tabindex="-1" role="dialog" aria-hidden="true">'+
           ' <div class="modal-content">'+
                '<div class="close-modal" data-dismiss="modal">'+
                    '<div class="lr">'+
                        '<div class="rl">'+
                        '</div>'+
                   ' </div>'+
               ' </div>'+
                '<div class="container">'+
                   ' <div class="row">'+
                       ' <div class="col-lg-8 col-lg-offset-2">'+
                            '<div class="modal-body">'+
                                '<h2>'+titulo+'</h2>'+
                                '<hr class="star-primary">'+
                                '<img src="'+carPhoto.url()+'" class="img-responsive img-centered" alt="">'+
                                '<p>'+ descripcion +'</p>'+
                                '<ul class="list-inline item-details">' +
                                    '<li>Creador:'+
                                        '<strong><a href="http://startbootstrap.com">Start Bootstrap</a>'+
                                        '</strong>'+
                                    '</li>' +
                                    '<li>Fecha:' +
                                       ' <strong><a href="http://startbootstrap.com">'+ date +'</a>' +
                                        '</strong>' +
                                    '</li>' +
                                    '<li>Codigo:' +
                                       ' <strong><a href="http://startbootstrap.com">'+ code +'</a>' +
                                        '</strong>' +
                                    '</li>' +                                 
                               ' </ul>' +
                               '<ul class="list-inline item-details">' +
                               'Tags: <strong>'+ tagger  + '</strong>' +
                              ' </ul>' +
                               ' <button type="button" class="btn btn-default" data-dismiss="modal"><i class="fa fa-times"></i> Close</button>' +
                           ' </div>' +
                        '</div>' +
                  ' </div>' +
                '</div>' +
            '</div>' +
        '</div>' ;
      
      $("#modulares").html(text2);


          }

      }).then(function() {
        alert('Busqueda finalizada');
       
      });

      ;



      


    }



















