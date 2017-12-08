package classified.Controller;

import java.io.IOException;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import classified.Service.CaminhoesService;
import classified.View.Model.CaminhoesAnoDataVM;
import classified.View.Model.CaminhoesMarcaDataVM;
import classified.View.Model.CaminhoesModeloDataVM;


@Controller
public class CaminhoesController {
	
	@Autowired
	CaminhoesService caminhoesService;
	
	@RequestMapping(value = "/crowlefipe", method = RequestMethod.GET)
	public void CrowleFipe(Model model) throws JsonProcessingException, IOException {
		
		 final String uri = "http://fipeapi.appspot.com/api/1/caminhoes/marcas.json";

		 CaminhoesMarcaDataVM caminhoesMarcaDataVM = new CaminhoesMarcaDataVM();
		 CaminhoesModeloDataVM caminhoesModeloDataVM = new CaminhoesModeloDataVM();
		 CaminhoesAnoDataVM caminhoesAnoDataVM = new CaminhoesAnoDataVM();
		 
		 
		    RestTemplate restTemplate = new RestTemplate();
		    String result = restTemplate.getForObject(uri, String.class);
		    
	        ObjectMapper mapper = new ObjectMapper();
	        final JsonNode jsonNode = mapper.readTree(result);
	        
	        for (final JsonNode nodes : jsonNode) {
	        	caminhoesMarcaDataVM.setMarca(StringUtils.strip(nodes.findValue("fipe_name").toString(), "\""));
	        	caminhoesMarcaDataVM.setFipeId(StringUtils.strip(nodes.findValue("id").toString(), "\""));
	        	caminhoesMarcaDataVM.setTipo("Caminhão");
	        	CaminhoesMarcaDataVM marcaid = caminhoesService.createMarca(caminhoesMarcaDataVM);
	        	
	        	long id = (nodes.findValue("id").asLong());
	        	
	        		final String uri_modelos = "http://fipeapi.appspot.com/api/1/caminhoes/veiculos/" + id + ".json";
		        	RestTemplate restTemplate_modelos = new RestTemplate();
		 		    String result_modelos = restTemplate_modelos.getForObject(uri_modelos, String.class);
		 		    
		 	        ObjectMapper mapper_modelos = new ObjectMapper();
		 	        final JsonNode jsonNode_modelos = mapper_modelos.readTree(result_modelos);
		 	       
		 	        for (final JsonNode jsonNode_modelo : jsonNode_modelos) {
			 	        
		 	        	caminhoesModeloDataVM.setModelo(StringUtils.strip(jsonNode_modelo.findValue("fipe_name").toString(), "\""));
			        	caminhoesModeloDataVM.setMarcaId(marcaid.getId());
			        	caminhoesModeloDataVM.setTipo("Caminhão");
			        	CaminhoesModeloDataVM modeloid = caminhoesService.createModelo(caminhoesModeloDataVM);
			        	
			        	long id_ano = (jsonNode_modelo.findValue("id").asLong());
			        	
				        	final String uri_ano = "http://fipeapi.appspot.com/api/1/caminhoes/veiculo/" + id + "/" + id_ano + ".json";
				        	RestTemplate restTemplate_ano = new RestTemplate();
				 		    String result_ano = restTemplate_ano.getForObject(uri_ano, String.class);
				 		    
				 	        ObjectMapper mapper_ano = new ObjectMapper();
				 	        final JsonNode jsonNode_ano = mapper_ano.readTree(result_ano);
				 	        
				 	        	for (final JsonNode jsonNode_anos : jsonNode_ano) {
				 	        		
				 	        		caminhoesAnoDataVM.setAno(StringUtils.strip(jsonNode_anos.findValue("name").toString(), "\""));
				 	        		caminhoesAnoDataVM.setModelo(StringUtils.strip(jsonNode_anos.findValue("veiculo").toString(), "\""));
						        	caminhoesAnoDataVM.setTipo("Caminhão");
						        	caminhoesAnoDataVM.setModeloId(modeloid.getId());
						        	
						        	String key_valor = StringUtils.strip(jsonNode_anos.findValue("key").toString(), "\"").trim().trim();
						        	
							        	final String uri_valor = "http://fipeapi.appspot.com/api/1/caminhoes/veiculo/" + id + "/" + id_ano + "/ " + key_valor +  ".json";
							        	RestTemplate restTemplate_valor = new RestTemplate();
							 		    String result_valor = restTemplate_valor.getForObject(uri_valor, String.class);
							 	        ObjectMapper mapper_valor = new ObjectMapper();
							 	        final JsonNode jsonNode_valor = mapper_valor.readTree(result_valor);
							 	        caminhoesAnoDataVM.setValor(StringUtils.strip(jsonNode_valor.findValue("preco").toString(), "\""));
								 	    caminhoesService.createAno(caminhoesAnoDataVM);;
							 	       
				 	        	}
		 	        }
	       }
	}
}
