import React from 'react';
import styles from './index.module.css'
import resumePdf from './SE-CV-Max-Xia.pdf';

const handleDownloadResume = () => {
    window.open(resumePdf);
  };

const About = () => {

    
    return (
        <div className={styles.resume}>
      <div className={styles.leftPanel}>
        <div className={styles.personalInfo}>
          <h2>Created by: Sufan(Max) Xia 😃</h2>
          <p>email: xiasufan@gmail.com</p>
          <p>mobile: 0452-006-065</p>
          <p>address: somewhere in melb</p>
          <p><button onClick={handleDownloadResume}>download CV</button>
          <a href='https://github.com/xiasufan/DogProfileWebApp/' target="_blank" rel="noopener noreferrer" style={{ marginLeft: 10, textDecoration: 'none' }}>
  <button>source code (Github)</button>
</a></p>
          
        </div>
      </div>

      <div className={styles.rightPanel}>
        <div className={styles.card}>
          <h2>Education 👨‍🎓</h2>
          <p>2015-2018: Bachelor of Science @ Unimelb</p>
          <p>2020-2023: Master of Software Engineering @ Unimelb</p>
        </div>

        

        <div className={styles.card}>
          <h2>Skills 📖</h2>
          <ul>
            <li>Programming Languages: Java, JavaScript, TypeScript, HTML, PHP, C, SQL, C#, Python</li>
            <li>Frameworks: React, Node, Next.js, Web.py</li>
            <li>Operating Systems: Windows, Linux (CentOS/Ubuntu), Android</li>
            <li>Utility: Git/GitHub, Docker, MySql, Redis, MongoDB, Swagger (API documentation), Microsoft Office (Word, Excel, PowerPoint,
Access), MS Project, Adobe Creative Suite (Photoshop, Illustrator, Flash), Unity, Conference, Jira, Slack</li>
          </ul>
        </div>

        <div className={styles.card}>
          <h2>About this project 💡</h2>
          <p>Front: React | Back:Node, Express.js | DB: MySql</p>
          <p>Production: Hosted on render free tier, MySql from clever-cloud</p>
        </div>
      </div>
    </div>
      );
};

export default About;
