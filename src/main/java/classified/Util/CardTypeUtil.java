package classified.Util;

import java.util.regex.Pattern;

public enum CardTypeUtil {

	UNKNOWN,
    visa("^4[0-9]{12}(?:[0-9]{3})?$"),
    mastercard("^5[1-5][0-9]{14}$"),
    american_express("^3[47][0-9]{13}$"),
    diners_club("^3(?:0[0-5]|[68][0-9])[0-9]{11}$"),
    discover("^6(?:011|5[0-9]{2})[0-9]{12}$"),
    jcb("^(?:2131|1800|35\\d{3})\\d{11}$");

    private Pattern pattern;

    CardTypeUtil() {
        this.pattern = null;
    }

    CardTypeUtil(String pattern) {
        this.pattern = Pattern.compile(pattern);
    }

    public static CardTypeUtil detect(String cardNumber) {

        for (CardTypeUtil cardType : CardTypeUtil.values()) {
            if (null == cardType.pattern) continue;
            if (cardType.pattern.matcher(cardNumber).matches()) return cardType;
        }

        return UNKNOWN;
    }
}
