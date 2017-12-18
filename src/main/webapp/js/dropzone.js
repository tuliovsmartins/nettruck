 $(document).ready(function() {
$('#drop_zone').on('dragover', function() {
	    $(this).addClass('hover');
});
	  
 $('#drop_zone').on('dragleave', function() {
	    $(this).removeClass('hover');
});
 
 
 $('#drop_zone input').on('change', function(e) {
		 e.stopPropagation();
		 e.preventDefault();
	 	var file =  e.target.files;
	 	
	 	$('#drop_zone_text').text("");	
	    
	    if (this.accept && $.inArray(file.type, this.accept.split(/, ?/)) == -1) {
	      return alert('File type not allowed.');
	    }
	    
	    for (var i = 0, f; f = file[i]; i++) {  
		 
	    	 if ((/^image\/(gif|png|jpeg)$/i).test(file[i].type)) {
	     
	    		 var reader = new FileReader(file[i]);
	    		 reader.readAsDataURL(file[i]);
			  
	    		 reader.onload = function(e) {
				  	
		            $img = ['<span class="dialog"><a id="remove_image" class="close-thik"></a><img class="drop_zone_thumb" src="', e.target.result, '" title="', escape(e.target.name), '"/></span>'].join('');
				  	$('#drop_zone').append($img); 
				  	
			  };}
			  else {
			      var ext = file.name.split('.').pop();
			      $('#dropzone div').html(ext);
			    }
		 }
	    
	    
	 });
 
 });
	 function removeFile(e){
	   	 alert(e);
	        var file = e;
	        for(var i=0;i<file.length;i++) {
	            if(storedFiles[i].name === file) {
	                storedFiles.splice(i,1);
	                break;
	            }
	        }
	        $(this).parent().remove();
	    }