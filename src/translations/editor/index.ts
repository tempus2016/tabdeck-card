// The editor's strings, registered when the editor (a separate file from
// the card, loaded on demand) is imported.
import { registerTranslations } from "../../lib/i18n";
import en from "./en";
import de from "./de";
import es from "./es";
import fr from "./fr";
import itl from "./it";
import nl from "./nl";
import pl from "./pl";
import pt from "./pt";

registerTranslations({ en, de, es, fr, it: itl, nl, pl, pt });
