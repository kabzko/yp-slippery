// Get static_url from document
const static_url: string = (document.getElementsByName('static_url')[0] as HTMLInputElement)?.defaultValue;

// Define interface for static images
interface StaticImages {
  [key: string]: string;
}

const static_images: StaticImages = {
  yahshua_payroll_logo: `${static_url}new-ui/img/slippery/yahshua_payroll_logo.png`,
  saly_walk: `${static_url}new-ui/img/slippery/saly_walk.png`,
  saly_walk_shadow: `${static_url}new-ui/img/slippery/saly_walk_shadow.png`,
  dog_excite: `${static_url}new-ui/img/slippery/dog_excite.png`,
  dog_excite_shadow: `${static_url}new-ui/img/slippery/dog_excite_shadow.png`,
  google_logo: `${static_url}new-ui/img/slippery/google_logo.png`,
  facebook_logo: `${static_url}new-ui/img/slippery/facebook_logo.png`,
  linkedin_logo: `${static_url}new-ui/img/slippery/linkedin_logo.png`,
  yahshua_logo: `${static_url}new-ui/img/slippery/yahshua_logo.png`,
  eu_gdpr_logo: `${static_url}new-ui/img/slippery/eu_gdpr_logo.png`,
  iso_27001: `${static_url}new-ui/img/slippery/iso_27001.png`,
};

// Change module.exports to export statement
export { static_images };
