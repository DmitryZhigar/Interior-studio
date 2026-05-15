import { computed, watch } from 'vue'

export type LocaleCode = 'he' | 'ru' | 'ka' | 'en'

type LocaleMeta = {
  code: LocaleCode
  label: string
  name: string
  htmlLang: string
  dir: 'ltr' | 'rtl'
  flagClass: string
}

type TranslationTree = Record<string, string | TranslationTree>

const fallbackLocale: LocaleCode = 'ru'

const locales: LocaleMeta[] = [
  {
    code: 'he',
    label: 'HE',
    name: 'עברית',
    htmlLang: 'he',
    dir: 'rtl',
    flagClass: 'flag-he'
  },
  {
    code: 'ru',
    label: 'RU',
    name: 'Русский',
    htmlLang: 'ru',
    dir: 'ltr',
    flagClass: 'flag-ru'
  },
  {
    code: 'ka',
    label: 'KA',
    name: 'ქართული',
    htmlLang: 'ka',
    dir: 'ltr',
    flagClass: 'flag-ka'
  },
  {
    code: 'en',
    label: 'EN',
    name: 'English',
    htmlLang: 'en',
    dir: 'ltr',
    flagClass: 'flag-en'
  }
]

const translations: Record<LocaleCode, TranslationTree> = {
  en: {
    nav: {
      home: 'Home',
      projects: 'Projects',
      studio: 'Studio',
      contact: 'Contact',
      manage: 'Manage',
      login: 'Login',
      logout: 'Logout',
      menu: 'Menu',
      language: 'Language'
    },
    home: {
      eyebrow: 'Interior Studio',
      titleLine1: 'Cinematic',
      titleLine2: 'Interior',
      titleLine3: 'Design',
      intro: 'Premium interiors for hotels, offices, residential and hospitality environments.',
      cta: 'View Projects',
      selected: 'Selected Work',
      featured: 'Featured Projects',
      viewAll: 'View All ->',
      estimateCta: 'Get Estimate'
    },
    projects: {
      eyebrow: 'Portfolio',
      title: 'Projects',
      all: 'All'
    },
    estimate: {
      eyebrow: 'Cost Request',
      title: 'Leave a request',
      subtitle: 'We will call you back shortly, clarify the project details, and prepare the next step.',
      nameLabel: 'Your name',
      namePlaceholder: 'Your name',
      phoneLabel: 'Phone number',
      phonePlaceholder: '+995 500 50 82 82',
      consent: 'I agree to the processing of my personal data.',
      submit: 'Send',
      sending: 'Sending...',
      success: 'Request sent successfully.',
      close: 'Close',
      message: 'Cost request from the home page.'
    },
    studio: {
      eyebrow: 'About Studio',
      titleLine1: 'Designing',
      titleLine2: 'spaces with',
      titleLine3: 'emotion.',
      intro: 'We create premium interiors for hospitality, residential and commercial environments with a focus on timeless aesthetics, atmosphere and architectural storytelling.',
      philosophy: 'Philosophy',
      statementLine1: 'Minimal.',
      statementLine2: 'Timeless.',
      statementLine3: 'Human.',
      body1: 'Every project is designed as a cinematic spatial experience where light, texture and composition create emotional depth.',
      body2: 'We believe that interiors should feel effortless, elegant and deeply connected to the people who inhabit them.'
    },
    contact: {
      eyebrow: 'Contact',
      titleLine1: "Let's create",
      titleLine2: 'something',
      titleLine3: 'exceptional.',
      information: 'Information',
      email: 'Email',
      phone: 'Phone',
      location: 'Location',
      locationValue: 'Prague, Czech Republic',
      namePlaceholder: 'Your Name',
      emailPlaceholder: 'Email',
      messagePlaceholder: 'Tell us about your project',
      submit: 'Send Request',
      sending: 'Sending...',
      success: 'Request sent successfully.'
    },
    footer: {
      brandText: 'Premium interior design studio creating timeless residential and commercial spaces.',
      contact: 'Contact',
      navigation: 'Navigation',
      rights: '© 2026 INTERIOR Studio. All rights reserved.',
      precision: 'Designed with precision.'
    },
    hero: {
      eyebrow: 'Interior Design Studio',
      titleLine1: 'Spaces',
      titleLine2: 'that inspire.',
      intro: 'Luxury residential and commercial interiors designed with architectural precision, emotional depth, and timeless aesthetics.',
      projects: 'View Projects',
      contact: 'Contact Studio',
      scroll: 'Scroll'
    }
  },
  ru: {
    nav: {
      home: 'Главная',
      projects: 'Проекты',
      studio: 'Студия',
      contact: 'Контакты',
      manage: 'Управление',
      login: 'Войти',
      logout: 'Выйти',
      menu: 'Меню',
      language: 'Язык'
    },
    home: {
      eyebrow: 'Интерьерная студия',
      titleLine1: 'Кинематографичный',
      titleLine2: 'интерьерный',
      titleLine3: 'дизайн',
      intro: 'Премиальные интерьеры для отелей, офисов, жилых и hospitality-пространств.',
      cta: 'Смотреть проекты',
      selected: 'Избранные работы',
      featured: 'Проекты',
      viewAll: 'Смотреть все ->',
      estimateCta: 'Узнать стоимость'
    },
    projects: {
      eyebrow: 'Портфолио',
      title: 'Проекты',
      all: 'Все'
    },
    estimate: {
      eyebrow: 'Расчёт стоимости',
      title: 'Оставить заявку',
      subtitle: 'Перезвоним в ближайшее время, уточним детали проекта и подскажем следующий шаг.',
      nameLabel: 'Введите ваше имя',
      namePlaceholder: 'Ваше имя',
      phoneLabel: 'Введите ваш номер телефона',
      phonePlaceholder: '+995 500 50 82 82',
      consent: 'Нажимая кнопку, вы соглашаетесь с условиями обработки персональных данных.',
      submit: 'Отправить',
      sending: 'Отправляем...',
      success: 'Заявка успешно отправлена.',
      close: 'Закрыть',
      message: 'Заявка на расчёт стоимости с главной страницы.'
    },
    studio: {
      eyebrow: 'О студии',
      titleLine1: 'Создаём',
      titleLine2: 'пространства',
      titleLine3: 'с эмоцией.',
      intro: 'Мы создаём премиальные интерьеры для hospitality, жилых и коммерческих пространств с фокусом на timeless-эстетику, атмосферу и архитектурный сторителлинг.',
      philosophy: 'Философия',
      statementLine1: 'Минимально.',
      statementLine2: 'Вне времени.',
      statementLine3: 'Человечно.',
      body1: 'Каждый проект задуман как кинематографичный пространственный опыт, где свет, фактура и композиция создают эмоциональную глубину.',
      body2: 'Мы верим, что интерьер должен ощущаться естественным, элегантным и глубоко связанным с людьми, которые в нём живут.'
    },
    contact: {
      eyebrow: 'Контакты',
      titleLine1: 'Давайте создадим',
      titleLine2: 'что-то',
      titleLine3: 'исключительное.',
      information: 'Информация',
      email: 'Email',
      phone: 'Телефон',
      location: 'Локация',
      locationValue: 'Прага, Чехия',
      namePlaceholder: 'Ваше имя',
      emailPlaceholder: 'Email',
      messagePlaceholder: 'Расскажите о проекте',
      submit: 'Отправить заявку',
      sending: 'Отправляем...',
      success: 'Заявка успешно отправлена.'
    },
    footer: {
      brandText: 'Премиальная интерьерная студия, создающая timeless жилые и коммерческие пространства.',
      contact: 'Контакты',
      navigation: 'Навигация',
      rights: '© 2026 INTERIOR Studio. Все права защищены.',
      precision: 'Спроектировано с точностью.'
    },
    hero: {
      eyebrow: 'Интерьерная студия',
      titleLine1: 'Пространства',
      titleLine2: 'которые вдохновляют.',
      intro: 'Премиальные жилые и коммерческие интерьеры, спроектированные с архитектурной точностью, эмоциональной глубиной и timeless-эстетикой.',
      projects: 'Смотреть проекты',
      contact: 'Связаться',
      scroll: 'Листайте'
    }
  },
  ka: {
    nav: {
      home: 'მთავარი',
      projects: 'პროექტები',
      studio: 'სტუდია',
      contact: 'კონტაქტი',
      manage: 'მართვა',
      login: 'შესვლა',
      logout: 'გასვლა',
      menu: 'მენიუ',
      language: 'ენა'
    },
    home: {
      eyebrow: 'ინტერიერის სტუდია',
      titleLine1: 'კინემატოგრაფიული',
      titleLine2: 'ინტერიერის',
      titleLine3: 'დიზაინი',
      intro: 'პრემიუმ ინტერიერები სასტუმროებისთვის, ოფისებისთვის, საცხოვრებელი და hospitality სივრცეებისთვის.',
      cta: 'პროექტების ნახვა',
      selected: 'რჩეული ნამუშევრები',
      featured: 'პროექტები',
      viewAll: 'ყველას ნახვა ->',
      estimateCta: 'ღირებულების გაგება'
    },
    projects: {
      eyebrow: 'პორტფოლიო',
      title: 'პროექტები',
      all: 'ყველა'
    },
    estimate: {
      eyebrow: 'ღირებულების მოთხოვნა',
      title: 'დატოვეთ განაცხადი',
      subtitle: 'მალე დაგირეკავთ, დავაზუსტებთ პროექტის დეტალებს და შემდეგ ნაბიჯს გეტყვით.',
      nameLabel: 'შეიყვანეთ თქვენი სახელი',
      namePlaceholder: 'თქვენი სახელი',
      phoneLabel: 'შეიყვანეთ ტელეფონის ნომერი',
      phonePlaceholder: '+995 500 50 82 82',
      consent: 'ღილაკზე დაჭერით ეთანხმებით პერსონალური მონაცემების დამუშავებას.',
      submit: 'გაგზავნა',
      sending: 'იგზავნება...',
      success: 'განაცხადი წარმატებით გაიგზავნა.',
      close: 'დახურვა',
      message: 'ღირებულების მოთხოვნა მთავარი გვერდიდან.'
    },
    studio: {
      eyebrow: 'სტუდიის შესახებ',
      titleLine1: 'ვქმნით',
      titleLine2: 'სივრცეებს',
      titleLine3: 'ემოციით.',
      intro: 'ვქმნით პრემიუმ ინტერიერებს hospitality, საცხოვრებელი და კომერციული სივრცეებისთვის, timeless ესთეტიკაზე, ატმოსფეროსა და არქიტექტურულ თხრობაზე ფოკუსით.',
      philosophy: 'ფილოსოფია',
      statementLine1: 'მინიმალური.',
      statementLine2: 'მარადიული.',
      statementLine3: 'ადამიანური.',
      body1: 'ყოველი პროექტი არის კინემატოგრაფიული სივრცითი გამოცდილება, სადაც სინათლე, ტექსტურა და კომპოზიცია ემოციურ სიღრმეს ქმნის.',
      body2: 'გვჯერა, რომ ინტერიერი უნდა იყოს ბუნებრივი, ელეგანტური და ღრმად დაკავშირებული ადამიანებთან, რომლებიც მასში ცხოვრობენ.'
    },
    contact: {
      eyebrow: 'კონტაქტი',
      titleLine1: 'შევქმნათ',
      titleLine2: 'რაღაც',
      titleLine3: 'განსაკუთრებული.',
      information: 'ინფორმაცია',
      email: 'Email',
      phone: 'ტელეფონი',
      location: 'ლოკაცია',
      locationValue: 'პრაღა, ჩეხეთი',
      namePlaceholder: 'თქვენი სახელი',
      emailPlaceholder: 'Email',
      messagePlaceholder: 'მოგვიყევით პროექტზე',
      submit: 'განაცხადის გაგზავნა',
      sending: 'იგზავნება...',
      success: 'განაცხადი წარმატებით გაიგზავნა.'
    },
    footer: {
      brandText: 'პრემიუმ ინტერიერის სტუდია, რომელიც ქმნის timeless საცხოვრებელ და კომერციულ სივრცეებს.',
      contact: 'კონტაქტი',
      navigation: 'ნავიგაცია',
      rights: '© 2026 INTERIOR Studio. ყველა უფლება დაცულია.',
      precision: 'შექმნილია სიზუსტით.'
    },
    hero: {
      eyebrow: 'ინტერიერის დიზაინის სტუდია',
      titleLine1: 'სივრცეები',
      titleLine2: 'რომლებიც შთააგონებს.',
      intro: 'პრემიუმ საცხოვრებელი და კომერციული ინტერიერები არქიტექტურული სიზუსტით, ემოციური სიღრმითა და timeless ესთეტიკით.',
      projects: 'პროექტების ნახვა',
      contact: 'სტუდიასთან კონტაქტი',
      scroll: 'სქროლი'
    }
  },
  he: {
    nav: {
      home: 'בית',
      projects: 'פרויקטים',
      studio: 'סטודיו',
      contact: 'יצירת קשר',
      manage: 'ניהול',
      login: 'כניסה',
      logout: 'יציאה',
      menu: 'תפריט',
      language: 'שפה'
    },
    home: {
      eyebrow: 'סטודיו לעיצוב פנים',
      titleLine1: 'עיצוב',
      titleLine2: 'פנים',
      titleLine3: 'קולנועי',
      intro: 'חללי פנים פרימיום למלונות, משרדים, מגורים ומרחבי אירוח.',
      cta: 'צפייה בפרויקטים',
      selected: 'עבודות נבחרות',
      featured: 'פרויקטים',
      viewAll: 'לכל הפרויקטים ->',
      estimateCta: 'קבלת הערכת מחיר'
    },
    projects: {
      eyebrow: 'פורטפוליו',
      title: 'פרויקטים',
      all: 'הכול'
    },
    estimate: {
      eyebrow: 'בקשת מחיר',
      title: 'השאירו פרטים',
      subtitle: 'נחזור אליכם בקרוב, נברר את פרטי הפרויקט ונציע את הצעד הבא.',
      nameLabel: 'השם שלך',
      namePlaceholder: 'השם שלך',
      phoneLabel: 'מספר טלפון',
      phonePlaceholder: '+995 500 50 82 82',
      consent: 'בלחיצה על הכפתור אתם מסכימים לעיבוד הנתונים האישיים.',
      submit: 'שליחה',
      sending: 'שולח...',
      success: 'הבקשה נשלחה בהצלחה.',
      close: 'סגירה',
      message: 'בקשת מחיר מעמוד הבית.'
    },
    studio: {
      eyebrow: 'על הסטודיו',
      titleLine1: 'מעצבים',
      titleLine2: 'חללים עם',
      titleLine3: 'רגש.',
      intro: 'אנחנו יוצרים חללי פנים פרימיום לאירוח, מגורים ומסחר, עם דגש על אסתטיקה על-זמנית, אווירה וסיפור אדריכלי.',
      philosophy: 'פילוסופיה',
      statementLine1: 'מינימלי.',
      statementLine2: 'על-זמני.',
      statementLine3: 'אנושי.',
      body1: 'כל פרויקט מתוכנן כחוויה מרחבית קולנועית, שבה אור, טקסטורה וקומפוזיציה יוצרים עומק רגשי.',
      body2: 'אנחנו מאמינים שחללי פנים צריכים להרגיש טבעיים, אלגנטיים ומחוברים עמוקות לאנשים שחיים בהם.'
    },
    contact: {
      eyebrow: 'יצירת קשר',
      titleLine1: 'בואו ניצור',
      titleLine2: 'משהו',
      titleLine3: 'יוצא דופן.',
      information: 'מידע',
      email: 'Email',
      phone: 'טלפון',
      location: 'מיקום',
      locationValue: "פראג, צ'כיה",
      namePlaceholder: 'השם שלך',
      emailPlaceholder: 'Email',
      messagePlaceholder: 'ספרו לנו על הפרויקט',
      submit: 'שליחת בקשה',
      sending: 'שולח...',
      success: 'הבקשה נשלחה בהצלחה.'
    },
    footer: {
      brandText: 'סטודיו פרימיום לעיצוב פנים שיוצר חללים מסחריים ומגורים על-זמניים.',
      contact: 'יצירת קשר',
      navigation: 'ניווט',
      rights: '© 2026 INTERIOR Studio. כל הזכויות שמורות.',
      precision: 'עוצב בדיוק.'
    },
    hero: {
      eyebrow: 'סטודיו לעיצוב פנים',
      titleLine1: 'חללים',
      titleLine2: 'שמעוררים השראה.',
      intro: 'חללי פנים יוקרתיים למגורים ולמסחר, בעיצוב מדויק אדריכלית, עמוק רגשית ועל-זמני.',
      projects: 'צפייה בפרויקטים',
      contact: 'יצירת קשר',
      scroll: 'גלילה'
    }
  }
}

const isLocaleCode = (value: unknown): value is LocaleCode =>
  typeof value === 'string' && locales.some(locale => locale.code === value)

const readTranslation = (tree: TranslationTree, path: string) => {
  const value = path.split('.').reduce<string | TranslationTree | undefined>((branch, part) => {
    if (!branch || typeof branch === 'string') {
      return undefined
    }

    return branch[part]
  }, tree)

  return typeof value === 'string' ? value : undefined
}

export const useLocale = () => {
  const localeCookie = useCookie<LocaleCode>('locale', {
    default: () => fallbackLocale,
    sameSite: 'lax'
  })

  const cookieLocale = isLocaleCode(localeCookie.value)
    ? localeCookie.value
    : fallbackLocale

  const locale = useState<LocaleCode>('locale', () => cookieLocale)

  if (!isLocaleCode(locale.value)) {
    locale.value = fallbackLocale
  }

  if (import.meta.server && locale.value !== cookieLocale) {
    locale.value = cookieLocale
  }

  const currentLocale = computed(() =>
    locales.find(item => item.code === locale.value) ?? locales.find(item => item.code === fallbackLocale)!
  )

  const setLocale = (value: LocaleCode) => {
    locale.value = value
    localeCookie.value = value
  }

  const t = (path: string) =>
    readTranslation(translations[locale.value], path) ??
    readTranslation(translations[fallbackLocale], path) ??
    path

  watch(locale, value => {
    localeCookie.value = isLocaleCode(value) ? value : fallbackLocale
  })

  return {
    locale,
    locales,
    currentLocale,
    setLocale,
    t,
    phoneNumber: '+995 500 50 82 82',
    phoneHref: 'tel:+995500508282'
  }
}
