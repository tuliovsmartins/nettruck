package classified.Service;

import java.awt.AlphaComposite;
import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.RenderingHints;
import java.awt.Transparency;
import java.awt.image.BufferedImage;
import java.io.BufferedOutputStream;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileOutputStream;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.imageio.ImageIO;

@Service
public class UploadFileService {

	public String fileUpload(String path, MultipartFile documentPhoto1, String folder) {

		 String fileName = "";

		try {
			fileName = documentPhoto1.getOriginalFilename();
			byte[] bytes = documentPhoto1.getBytes();
			File file = new File(path + "/" + folder + "/" + fileName);
			file.getParentFile().mkdirs();
			FileOutputStream fileOutputStream = new FileOutputStream(file);
			BufferedOutputStream bufferedOutputStream = new BufferedOutputStream(fileOutputStream);
					
			bufferedOutputStream.write(bytes);
			bufferedOutputStream.close();
			return file.getName();
		} catch (Exception e) {
			return e.getMessage();
		}

	}
	
	public String fileUploadUniqueName(String path, MultipartFile documentPhoto1, String folder) {

		String fileName = "";
		 SimpleDateFormat df = new SimpleDateFormat("yyyyMMddhhmmSSSZ");
		 String date = df.format(new Date());

		try {
			fileName = documentPhoto1.getOriginalFilename();
			
			String extension = fileName.split("\\.")[1];
			byte[] bytes = documentPhoto1.getBytes();
			File file = new File(path + "/" + folder + "/" + date + "." + extension);
			file.getParentFile().mkdirs();
			FileOutputStream fileOutputStream = new FileOutputStream(file);
			
			BufferedOutputStream bufferedOutputStream = new BufferedOutputStream(fileOutputStream);
			bufferedOutputStream.write(bytes);
			bufferedOutputStream.close();
			
			BufferedImage image = ImageIO.read(file);
			BufferedImage resized = getScaledInstance(image, 185, 110, true);
			File output = new File(path + "/"+ folder + "/" + date + "_thumb." + extension);
		    ImageIO.write(resized, "jpg", output);
		    
			return file.getName();
		} catch (Exception e) {
			return e.getMessage();
		}

	}
	
	
	private static BufferedImage resizeImage(BufferedImage originalImage, int height, int width, int type){
		BufferedImage resizedImage = new BufferedImage(width, height, type);
		Graphics2D g = resizedImage.createGraphics();
		g.drawImage(originalImage, 0, 0, width, height, null);
		g.dispose();

		return resizedImage;
	    }
	
	private static BufferedImage resizeImageWithHint(BufferedImage originalImage,  int height, int width, int type){

		BufferedImage resizedImage = new BufferedImage(width, height, type);
		Graphics2D g = resizedImage.createGraphics();
		g.drawImage(originalImage, 0, 0, width, height, null);
		g.dispose();
		g.setComposite(AlphaComposite.Src);

		g.setRenderingHint(RenderingHints.KEY_INTERPOLATION,
		RenderingHints.VALUE_INTERPOLATION_BILINEAR);
		g.setRenderingHint(RenderingHints.KEY_RENDERING,
		RenderingHints.VALUE_RENDER_QUALITY);
		g.setRenderingHint(RenderingHints.KEY_ANTIALIASING,
		RenderingHints.VALUE_ANTIALIAS_ON);

		return resizedImage;
	    }
	
	
	public BufferedImage getScaledInstance(BufferedImage img,  int targetWidth, int targetHeight, boolean higherQuality)
{
		int type = (img.getTransparency() == Transparency.OPAQUE) ?
		BufferedImage.TYPE_INT_RGB : BufferedImage.TYPE_INT_ARGB;
		BufferedImage ret = (BufferedImage)img;
		int w, h;
		if (higherQuality) {
			w = img.getWidth();
			h = img.getHeight();
		} else {
			w = targetWidth;
			h = targetHeight;
		}
		
		do {
			if (higherQuality && w > targetWidth) {
					w /= 2;
				if (w < targetWidth) {
						w = targetWidth;
				}
			}
		
		if (higherQuality && h > targetHeight) {
			h /= 2;
				if (h < targetHeight) {
					h = targetHeight;
				}
		}

	BufferedImage tmp = new BufferedImage(w, h, type);
	Graphics2D g2 = tmp.createGraphics();
	g2.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BICUBIC);
	g2.drawImage(ret, 0, 0, w, h, null);
	g2.dispose();

	ret = tmp;
		} while (w != targetWidth || h != targetHeight);

			return ret;
}

}
