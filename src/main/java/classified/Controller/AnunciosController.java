package classified.Controller;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import classified.Service.AnunciosService;
import classified.Service.CaminhoesService;
import classified.Service.UploadFileService;
import classified.Util.BreadCrumbs;
import classified.Util.UserInfo;
import classified.View.Model.AcessoriosDataVM;
import classified.View.Model.AnuncioFotoDataVM;
import classified.View.Model.AnunciosDataVM;
import classified.View.Model.CaminhoesAnoDataVM;
import classified.View.Model.CaminhoesMarcaDataVM;
import classified.View.Model.CaminhoesModeloDataVM;
import classified.View.Model.UserDataVM;

@Controller
@RequestMapping("/user")
public class AnunciosController {
	
	@Autowired
	private UserInfo userInfo;
	
	@Autowired
	private CaminhoesService caminhoesService;
	
	@Autowired
	private AnunciosService anunciosService;
	
	@Autowired
	private UploadFileService uploadFileService;
	
	@RequestMapping("/newfeature")
	public String anuncio(Model model) throws InterruptedException {
		
		BreadCrumbs.set(model, "Cadastrar Anuncio");
		userInfo.getUserInfo(model);
		List<AcessoriosDataVM> acessorios = caminhoesService.getAcessorios();
		model.addAttribute("acessorios", acessorios);
		
		return "/user/newfeature";
		
	}
	
	
	@RequestMapping(value = "/cadAnuncio", method = RequestMethod.GET)
	public ModelAndView cadAnuncio(Model model, AnunciosDataVM anunciosDataVM) throws InterruptedException {
		
		BreadCrumbs.set(model, "Cadastrar Anuncio");
		userInfo.getUserInfo(model);
		model.addAttribute("anunciosDataVM", anunciosDataVM);
		ModelAndView mv = new ModelAndView("redirect:/user/newfeature");
		
		return mv;
		
	}
	
	@RequestMapping(value = "/cadAnuncio", method = RequestMethod.POST)
	public ModelAndView cadAnuncio(@ModelAttribute AnunciosDataVM anunciosDataVM, BindingResult result, @RequestParam("file") MultipartFile[] file, RedirectAttributes atributes 
			, Model model) throws InterruptedException {
		
		UserDataVM userDataVM = userInfo.getUserInfo(model);
		AnuncioFotoDataVM anuncioFotoDataVM =  new AnuncioFotoDataVM();
		
		if(result.hasErrors()){
			
			return cadAnuncio(model, anunciosDataVM);
			
		} 
		
		
		
		anunciosDataVM.setCadastroData(new Date());
		anunciosDataVM.setUserId(userDataVM.getId());
		anunciosDataVM.setStatus("Ativo");
		anunciosDataVM = anunciosService.createAnuncio(anunciosDataVM);
		
		for(MultipartFile uploadedFile : file) {
			String imageFile = null;
			String folder = String.valueOf(anunciosDataVM.getId());
			imageFile = uploadFileService.fileUploadUniqueName("src/main/webapp/img/classificados/", uploadedFile, folder);
			anuncioFotoDataVM.setAnuncioId(anunciosDataVM.getId());
			anuncioFotoDataVM.setCadData(new Date());
			anuncioFotoDataVM.setFoto(imageFile);
			anuncioFotoDataVM.setPrincipal(false);
			anunciosService.cadFotos(anuncioFotoDataVM);
        }
		atributes.addFlashAttribute("message", "Anúncio " + anunciosDataVM.getPreco() + " cadastrado com sucesso!");
		ModelAndView mv = new ModelAndView("redirect:/user/newfeature");
		model.addAttribute("anunciosDataVM", anunciosDataVM);
		return mv;
		
	}
	
	@RequestMapping(value = "/newfeature/{type}", method = RequestMethod.POST)
	public @ResponseBody List<CaminhoesMarcaDataVM> getType(Model model, @PathVariable String type) throws InterruptedException {
		List<CaminhoesMarcaDataVM> caminhoesMarcaDataVM = caminhoesService.getMarcas();
		model.addAttribute("caminhoesMarcaDataVM", caminhoesMarcaDataVM);
		
		return caminhoesMarcaDataVM;
	}
	
	@RequestMapping(value = "/model/{id}", method = RequestMethod.POST)
	public @ResponseBody List<CaminhoesModeloDataVM> getModel(Model model, @PathVariable String id) throws InterruptedException {
		
		long ids = Long.valueOf(id);
		List<CaminhoesModeloDataVM> caminhoesModeloDataVM = caminhoesService.getModeloByMarcaId(ids);
		model.addAttribute("caminhoesModeloDataVM", caminhoesModeloDataVM);
		
		return caminhoesModeloDataVM;
	}
	
	@RequestMapping(value = "/year/{id}", method = RequestMethod.POST)
	public @ResponseBody List<CaminhoesAnoDataVM> getYear(Model model, @PathVariable String id) throws InterruptedException {
		
		long ids = Long.valueOf(id);
		List<CaminhoesAnoDataVM> caminhoesAnoDataVM = caminhoesService.getAnoByModeloId(ids);
		model.addAttribute("caminhoesAnooDataVM", caminhoesAnoDataVM);
		
		return caminhoesAnoDataVM;
	}
	
	@RequestMapping(value = "/valor/{id}", method = RequestMethod.POST)
	public @ResponseBody CaminhoesAnoDataVM getYearById(Model model, @PathVariable String id) throws InterruptedException {
		
		long ids = Long.valueOf(id);
		CaminhoesAnoDataVM caminhoesAnoDataVM = caminhoesService.getAnoById(ids);
		model.addAttribute("caminhoesAnooDataVM", caminhoesAnoDataVM);
		
		return caminhoesAnoDataVM;
	}
	

}
