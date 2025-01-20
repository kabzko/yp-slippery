// Get static_url from document
const static_url: string = (document.getElementsByName('static_url')[0] as HTMLInputElement)?.defaultValue;

// Define interface for static images
interface StaticImages {
  [key: string]: string;
}

const static_images: StaticImages = {
  top_menu_logo: `${static_url}new-ui/img/YPO.png`,
  hero_section_1: `${static_url}new-ui/img/HeroSection1.png`,
  hero_section_2: `${static_url}new-ui/img/HeroSection2.png`,
  ticket: `${static_url}new-ui/img/ticket.png`,
  yp_login_logo: `${static_url}new-ui/img/yplogin.png`,
  google_logo: `${static_url}new-ui/img/google.png`,
  facebook_logo: `${static_url}new-ui/img/facebook.png`,
  linkedin_logo: `${static_url}new-ui/img/linkedin.png`,
  yahshua_logo: `${static_url}new-ui/img/yahshua.png`,
  lock_logo: `${static_url}new-ui/img/lock.png`,
  learn_and_support_header: `${static_url}new-ui/img/learnandsupportheader.png`,
  community_header: `${static_url}new-ui/img/communityheader.png`,
  community_people_1: `${static_url}new-ui/img/people1.png`,
  community_people_2: `${static_url}new-ui/img/people2.png`,
  community_people_3: `${static_url}new-ui/img/people3.png`,
  community_people_4: `${static_url}new-ui/img/people4.png`,
  question_and_answer: `${static_url}new-ui/img/payrollqa.png`,
  header_journal_1: `${static_url}new-ui/img/header_journal_1.png`,
  header_journal_2: `${static_url}new-ui/img/header_journal_2.png`,
  header_journal_3: `${static_url}new-ui/img/header_journal_3.png`,
  header_tweets: `${static_url}new-ui/img/header_tweets.png`,
  talk_to_us_background: `${static_url}new-ui/img/talk_to_us_background.jpg`,
  select_user_wave: `${static_url}new-ui/img/email_wave.png`,
  error_logo: `${static_url}new-ui/img/error.png`,
  sad_face: `${static_url}new-ui/img/sad_face.png`,
  dragonpay: `${static_url}new-ui/img/dragonpay_logo.png`,
  maya: `${static_url}new-ui/img/maya_logo.png`,
  paymongo: `${static_url}new-ui/img/paymongo_logo.png`,
  sally: `${static_url}new-ui/img/sally.png`,
  rocket: `${static_url}new-ui/img/rocket.png`,
  globe: `${static_url}new-ui/img/globe.png`,
  gdpr1: `${static_url}new-ui/img/gdpr1.png`,
  iso: `${static_url}new-ui/img/iso.png`,
};

// Change module.exports to export statement
export {
  static_images,
};
