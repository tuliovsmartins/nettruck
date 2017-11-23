Path = function() {
  this.setPath = function() {
    
    pathArray = window.location.href.split( '../../external.html?link=http://www.flightmarket.com.br/' );
    protocol = pathArray[0];
    host = pathArray[2];
    url = protocol + '//' + host + '/'; //modificar na producao
    //url = protocol + '//' + host + '/grupodeandrologia/'; //modificar na producao
    
    return url;
  }
};