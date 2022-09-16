import category from './../assets/icons/category.svg';
import message from './../assets/icons/message.svg';
import task from './../assets/icons/task-square.svg';
import User from './../assets/icons/User.svg';
import Setting from './../assets/icons/setting.svg';
import speaker from './../assets/icons/speaker.svg';
import germany from './../assets/icons/germany.svg';
import headphone from './../assets/icons/headphone.svg';
import book from './../assets/img/book.png';
import likes from './../assets/img/Likes.png';
import lamp from './../assets/img/Vector.png';
import headphones from './../assets/icons/headphones.svg';
import image from './../assets/icons/image.svg';
import type from './../assets/icons/type.svg';
import film from './../assets/icons/film.svg';
import help from './../assets/icons/help-circle.svg';
import tt from './../assets/icons/tt.svg';
import adminicon from './../assets/img/adminicon.png';
import usericon from './../assets/img/usericon.png';
import Home from './../assets/icons/home.svg';
import eiffeltower from './../assets/img/eiffeltower.png';
import kaaba from './../assets/img/kaaba.png';
import pisatower from './../assets/img/pisatower.png';
import bigben from './../assets/icons/bigben.svg';
import china from './../assets/icons/china.svg';
import spain from './../assets/img/spain.png';
import translation from './../assets/img/translation.png';
export default {
  DRAWER_WIDTH: 221,

  Exercises_List: {
    name: 'exercises',
    items: [
      {
        id: 1,
        title: 'نصيحة',
        intro: 'ضع حاوية الصورة',
        thumbnail: lamp,
      },
      {
        id: 2,
        title: 'صحيحة او خاطئة',
        intro: 'ضع حاوية الصورة',
        thumbnail: likes,
      },
    ],
  },
  inputdata: [
    {
      label: 'اضف النص الاول',
      placeholder: 'اضف النص الاول',
    },
    {
      label: 'اضف النص الثاني',
      placeholder: 'اضف النص الثاني',
    },
  ],
  Regulations_list: [
    {
      id: 1,
      label: 'سؤال',
      blockId: 'questionBlock',
      placeholder: 'اضف سؤالك',
      img: help,
    },
    {
      id: 2,
      label: 'صورة',
      blockId: 'imageBlock',
      placeholder: 'استيراد صورتك',
      img: image,
    },
    {
      id: 3,
      label: 'فيديوا',
      blockId: 'videoBlock',
      placeholder: 'استيراد فيديوا',
      img: film,
    },
  ],
  elementsList: [
    {
      element: 'العنصر1',
    },
    {
      element: 'العنصر2',
    },
  ],
  words: [
    {
      id: 1,
      word: 'الكلمة الاولى',
    },
    {
      id: 2,
      word: 'الكلمة الثانية',
    },
    {
      id: 3,
      word: 'الكلمة الثالثة',
    },
  ],
  suggestions: [
    {
      id: 1,
      suggestion: 'الاحتمال 1',
    },
    {
      id: 2,
      suggestion: 'الاحتمال 2',
    },
    {
      id: 3,
      suggestion: 'الاحتمال 3',
    },
  ],
  Regulations_list2: [
    {
      id: 1,
      label: 'نص',
      blockId: 'textBlock',
      placeholder: 'اضف نصك',
      img: type,
    },
    {
      id: 2,
      label: 'وصف',
      blockId: 'descriptionBlock',
      placeholder: ' اضف نصك',
      img: tt,
    },
    {
      id: 3,
      label: 'صوت',
      blockId: 'audioBlock',
      placeholder: 'استيراد صوت',
      img: headphones,
    },
    {
      id: 4,
      label: 'العنوان',
      blockId: 'titleBlock',
      placeholder: 'اضف العنوان',
      img: type,
    },
  ],

  columnsFromBackend: {
    today: {
      name: 'Requested',
      items: [
        {
          id: 1,
          name: 'نصيحة',
          description: 'ضع حاوية الصورة',
          img: lamp,
        },
        {
          id: 2,
          name: 'صوت',
          description: 'ضع حاوية الصورة',
          img: likes,
        },
        {
          id: 3,
          name: 'فيديوا',
          description: 'ضع حاوية الصورة',
          img: headphones,
        },
        {
          id: 4,
          name: 'صوورة',
          description: 'ضع حاوية الصورة',
          img: image,
        },
        {
          id: 5,
          name: 'صورة',
          description: 'ضع حاوية الصورة',
          img: type,
        },
        {
          id: 6,
          name: 'مراقبة',
          description: 'ضع حاوية الصورة',
          img: film,
        },
        {
          id: 7,
          name: 'نصيحة',
          description: 'ضع حاوية الصورة',
          img: message,
        },
        {
          id: 8,
          name: 'نصيحة',
          description: 'ضع حاوية الصورة',
          img: type,
        },
        {
          id: 9,
          name: 'نصيحة',
          description: 'ضع حاوية الصورة',
          img: lamp,
        },

        {
          id: 10,
          name: 'نصيحة',
          description: 'ضع حاوية الصورة',
          img: lamp,
        },
        {
          id: 11,
          name: 'نصيحة',
          description: 'ضع حاوية الصورة',
          img: lamp,
        },
        {
          id: 12,
          name: 'نصيحة',
          description: 'ضع حاوية الصورة',
          img: lamp,
        },
      ],
    },
    tomrrow: {
      name: 'To do',
      items: [],
    },
  },
  Exercises_List2: [
    {
      id: 1,
      name: 'نصيحة',
      description: 'ضع حاوية الصورة',
      img: lamp,
    },
    {
      id: 2,
      name: 'نصيحة',
      description: 'ضع حاوية الصورة',
      img: likes,
    },
    {
      id: 3,
      name: 'نصيحة',
      description: 'ضع حاوية الصورة',
      img: headphones,
    },
    {
      id: 4,
      name: 'نصيحة',
      description: 'ضع حاوية الصورة',
      img: image,
    },
    {
      id: 5,
      name: 'نصيحة',
      description: 'ضع حاوية الصورة',
      img: type,
    },
    {
      id: 6,
      name: 'نصيحة',
      description: 'ضع حاوية الصورة',
      img: film,
    },
    {
      id: 7,
      name: 'نصيحة',
      description: 'ضع حاوية الصورة',
      img: message,
    },
    {
      id: 8,
      name: 'نصيحة',
      description: 'ضع حاوية الصورة',
      img: type,
    },
    {
      id: 9,
      name: 'نصيحة',
      description: 'ضع حاوية الصورة',
      img: lamp,
    },

    {
      id: 10,
      name: 'نصيحة',
      description: 'ضع حاوية الصورة',
      img: lamp,
    },
    {
      id: 11,
      name: 'نصيحة',
      description: 'ضع حاوية الصورة',
      img: lamp,
    },
    {
      id: 12,
      name: 'نصيحة',
      description: 'ضع حاوية الصورة',
      img: lamp,
    },
  ],

  languages_list: [
    {
      id: 1,
      name: 'فرنسية',
      coursesnumber: 35,
      img: eiffeltower,
      percentage: 20,
      color1: '#48c6ef',
      color2: '#6f86d6',
    },
    {
      id: 2,
      name: 'عربية',
      coursesnumber: 20,
      img: kaaba,
      percentage: 50,
      color1: '#f6d365',
      color2: '#fda085',
    },
    {
      id: 3,
      name: 'انقليزية',
      coursesnumber: 40,
      img: bigben,
      percentage: 30,
      color1: '#d4fc79',
      color2: '#96e6a1',
    },

    {
      id: 4,
      name: 'ايطالية',
      coursesnumber: 15,
      img: pisatower,
      percentage: 80,
      color1: '#FFE29F',
      color2: '#FF719A',
    },
    {
      id: 5,
      name: 'صينية',
      coursesnumber: 15,
      img: china,
      percentage: 80,
      color1: '#f83600',
      color2: '#f9d423',
    },

    {
      id: 6,
      name: 'المانية',
      coursesnumber: 15,
      img: germany,
      percentage: 40,
      color1: '#64b3f4',
      color2: '#c2e59c',
    },

    {
      id: 7,
      name: 'اسبانية',
      coursesnumber: 10,
      img: spain,
      percentage: 55,
      color1: '#e0c3fc',
      color2: '#8ec5fc',
    },
  ],
  dataBar: {
    labels: ['جويلية', 'جوان', 'ماي', 'افريل', 'مارس', 'فيفري', 'جانفي'],
    datasets: [
      {
        id: 1,
        label: 'عدد الانشطة في الشهر',
        barThickness: 20,
        borderRadius: 20,
        backgroundColor: '#FFB09D',
        borderColor: '#FFB09D',
        borderWidth: 1,
        data: [65, 59, 80, 81, 56, 55, 40],
      },
      {
        id: 2,
        label: 'عدد الانشطة في الاسبوع',
        barThickness: 20,
        borderRadius: 20,
        backgroundColor: '#C6F782',
        borderColor: '#C6F782',
        data: [50, 40, 87, 70, 30, 44, 15],
      },
    ],
  },
  dash_courses: [
    {
      id: 1,
      title: 'قراة الموضوع الاول',
      icon: book,
      color: '#FDA085',
    },
    {
      id: 2,
      title: 'استماع الموضوع الاول',
      icon: headphone,
      color: '#A8ED96',
    },
    {
      id: 3,
      title: 'تكلم الموضوع الاول',
      icon: headphone,
      color: '#A8ED96',
    },
    {
      id: 4,
      title: 'تكلم الموضوع الاول',
      icon: speaker,
      color: '#FF719A',
    },
    {
      id: 5,
      title: 'استماع الموضوع الاول',
      icon: headphone,
      color: '#A8ED96',
    },
    {
      id: 6,
      title: 'قراة الموضوع الاول',
      icon: book,
      color: '#FDA085',
    },
    {
      id: 7,
      title: 'قراة الموضوع الاول',
      icon: book,
      color: '#FDA085',
    },
    {
      id: 8,
      title: 'تكلم الموضوع الاول',
      icon: speaker,
      color: '#FF719A',
    },
  ],

  statistics: [
    {
      id: 1,
      title: 'الدروس المنتهية',
      nbr: 250,
    },
    {
      id: 2,
      title: 'النقاط المكتسبة',
      nbr: 10,
    },
    {
      id: 3,
      title: 'المهام المنتهية',
      nbr: 50,
    },
    {
      id: 4,
      title: 'الدورات قيد التقدم',
      nbr: 30,
    },
  ],

  levels: [
    {
      id: '1',
      title: 'مبتدا',
    },
    {
      id: '2',
      title: 'ابندائي',
    },
    {
      id: '3',
      title: 'متوسط',
    },
    {
      id: '4',
      title: 'فوق المتوسط',
    },
    {
      id: '4',
      title: 'متقدم',
    },
  ],
  SIDEBAR_LIST: [
    {
      id: 8,

      icon: translation,

      name: 'اللغات',

      url: '/languages',

      type: 'route',

      permission: false,
    },

    {
      id: 1,

      icon: category,

      name: 'الفصول',

      url: '/chapters',

      type: 'route',

      permission: false,
    },

    {
      id: 2,

      icon: message,

      name: 'الدروس',

      url: '/courses',

      type: 'route',

      permission: false,
    },

    {
      id: 3,

      icon: task,

      name: 'المستويات',

      url: '/levels',

      type: 'route',

      permission: false,
    },
    {
      id: 0,

      icon: Home,

      name: 'لوحة القيادة',

      url: '/',

      type: 'route',

      permission: false,
    },
    {
      id: 4,

      icon: User,

      name: 'المستخدمين',

      url: '/users',

      type: 'submenu',

      children: [
        {
          id: 6,
          name: 'المستخدم',
          url: '/user',
          icon: usericon,
          type: 'route',
          permission: false,
        },
        {
          id: 7,
          name: 'المشرف',
          url: '/admin',
          icon: adminicon,
          type: 'route',
          permission: false,
        },
      ],
    },

    {
      id: 5,

      icon: Setting,

      name: 'اعدادات',

      url: '/settings',

      type: 'route',

      permission: false,
    },
  ],
};
