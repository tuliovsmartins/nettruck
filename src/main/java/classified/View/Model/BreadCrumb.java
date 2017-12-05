package classified.View.Model;

public class BreadCrumb {
	
    private String link;
    private String linktext;


    public BreadCrumb(String link, String linktext) {
        this.link = link;
        this.linktext = linktext;
    }

    public String getLink() {
        return link;
    }

    public String getLinktext() {
        if (linktext == null || "".equals(linktext)) {
            return "Unknown";
        } else if (linktext.length() >= 25) {
            return linktext.substring(0, 24) + "..."; //"…";
        } else {
            return linktext;
        }
    }

}
