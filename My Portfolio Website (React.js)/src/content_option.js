const logotext = "Avinash";
const meta = {
    title: "Avinash Saini",
    description: "Full Stack Developer(MERN)",
};

const introdata = {
    title: "I’m Avinash Saini",
    animated: {
        first: "MERN Stack Developer",
        // second: "I code cool websites",
        // third: "I develop mobile apps",
    },
    description: "Hello! I'm a dedicated MERN stack developer who loves crafting innovative web solutions. With expertise in MongoDB, Express.js, React, and Node.js, I focus on creating efficient and scalable applications. Dive into my projects to see the breadth of my work and the creativity I bring to each challenge.",
    your_img_url: require("./my.jpg"),
};

const dataabout = {
    title: "about my self",
    aboutme: "I am a MERN stack developer with a passion for building web applications that make a difference. Skilled in MongoDB, Express.js, React, and Node.js, I pride myself on my ability to design and implement features that are both functional and visually appealing. My portfolio is a testament to my journey in the tech world, showcasing projects that highlight my technical prowess and dedication to continuous learning.",
};
const worktimeline = [{
        jobtitle: "MERN Stack Deveoper(Intern)",
        where: "Inventcolabs",
        duration: "Currently working (since April 2024)",
    },
    {
        jobtitle: "MERN Stack Developer(Training)",
        where: "SRV IT Solutions",
        duration: "4 Months",
    },
   
    // {
    //     jobtitle: "Designer of week",
    //     where: "ALquds",
    //     date: "2019",
    // },
];

const education = [{
    course:"M.Tech (Computer Science)",
    university:"Career Point University, Kota",
    session:"2022-2024",
    percentage:"Pursuing",
},
{
    course:"B.Tech (Electrical)",
    university:"Rajasthan Technical University",
    session:"2018-2022",
    percentage:"68.50%",
},
{
    course:"12th Standard",
    university:"Central Board of Secondary Education",
    session:"2016-2017",
    percentage:"52.50%",
},
{
    course:"10th Standard",
    university:"Central Board of Secondary Education",
    session:"2014-2015",
    percentage:"76.00%",
},



];

const skills = [
    {
        name: "Javascript",
        value: 50,
    },
    {
        name: "React.js",
        value: 70,
    },
    {
        name: "Express.js",
        value: 50,
    },
    {
        name: "Node.js",
        value: 60,
    },
    {
        name: "MongoDB",
        value: 60,
    },
    {
        name: "Adobe Photoshop",
        value: 70,
    },
    {
        name: "Adobe Audition",
        value: 70,
    },
    {
        name: "MySQL",
        value: 40,
    },
    
];

const services = [{
        title: "Web Developer",
        description: "Can develop innovative, user interactive web applications.",
    },
    // {
    //     title: "Mobile Apps",
    //     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at nisl euismod urna bibendum sollicitudin.",
    // },
    // {
    //     title: "Wordpress Design",
    //     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at nisl euismod urna bibendum sollicitudin.",
    // },
];

const dataportfolio = [{
    img: require("./event.png"),
    description: "Event Management Website (Website, Admin, Server)",
    link: "https://github.com/avinashsaini39/Projects/tree/main/Event%20Manage%201%20(MERN)",
},{
        img: require("./auth.png"),
        description: "An authentication system with login and signup",
        link: "https://github.com/avinashsaini39/Projects/tree/main/Authentication%20(MERN)",
    },
    {
        img: require("./crud.png"),
        description: "Create, Read, Update and Delete Application (CRUD)",
        link: "https://github.com/avinashsaini39/Projects/tree/main/CRUD%20Application%20(MERN)",
    },
    {
        img: require("./todo.png"),
        description: "TO-DO List using MERN",
        link: "https://github.com/avinashsaini39/Projects/tree/main/CRUD%20Application%20(React.js)",
    },
    
    
];

const contactConfig = {
    YOUR_EMAIL: "avinashsaini39@gmail.com",
    YOUR_FONE: "+91-8107707411",
    // description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vehicula eu nunc et sollicitudin. Cras pulvinar, nisi at imperdiet pharetra. ",
    // creat an emailjs.com account 
    // check out this tutorial https://www.emailjs.com/docs/examples/reactjs/
    YOUR_SERVICE_ID: "ENTER YOUR EMAILJS SERVICE ID",
    YOUR_TEMPLATE_ID: "ENTER YOUR EMAILJS TEMPLATE ID",
    YOUR_PUBLIC_KEY: "ENTER YOUR EMAILJS PUBLIC KEY",
    // YOUR_USER_ID: "user_id",
};

const socialprofils = {
    github: "https://github.com/avinashsaini39/Projects",
    // facebook: "https://facebook.com",
    linkedin: "https://linkedin.com/in/avinash-saini",
    // twitter: "https://twitter.com",
};
export {
    meta,
    dataabout,
    dataportfolio,
    worktimeline,
    education,
    skills,
    services,
    introdata,
    contactConfig,
    socialprofils,
    logotext,
};