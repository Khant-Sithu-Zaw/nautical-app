import reset from "../style/reset";
import cvStyles from "../style/cvStyles";
import { formatShortDate } from "./methods";
export default function generateCVHtml(user) {
  const skills = user?.skills || [];
  const certificates = user?.certificates || [];
  const seaTimeRecords = user?.seaTimeRecords || [];
  return `
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
     <body>
      <style>
      ${reset}
      ${cvStyles}
    </style>
      <div class="container">
        <div class="leftColumn">
          <img src="${user.image}" class="profilePic" alt="profile picture"/>
             <div class="section leftInner">
                <h3 class=" title">Personal Info</h3>
                 
                <div class="leftText">
                    <p class="paragraph"> 🎓 ${user.edu}</p>
                </div>
                <div class="leftText">
                    <p class="paragraph"> 🎂 ${user.birthday}</p>
                </div>
                <div class="leftText">
                   
                    <p class="paragraph">🌐 ${user.nationality}</p>
                </div>
                <div class="leftText">
                   
                    <p class="paragraph">📕 ${user.passport}</p>
                </div>
                <div class="leftText">
                    <p class="paragraph">📞 ${user.phone}</p>
                </div>
                <div class="leftText">
                    
                    <p class="paragraph">✉️ ${user.email}</p>
                </div>
                
                <div class="leftText">
               
                    <p class="paragraph">🏠 ${user.address}</p>
                </div>
              </div>
            ${user.hobbies && user.hobbies.length > 0 ? `
            <div class="section leftInner">
            <h3 class="title">Hobbies</h3>
             
                ${user.hobbies.map(h => `
                  <div class="paragraph list">
                    ${h} 
                  </div>
                `).join("")}
   
            </div>
          ` : ""}
            
        </div>

        <div class="rightColumn">
          <h2 class="text userName">${user.name || "Your Name"}</h2>
          <h4 class="text subTitle">Rank: ${user.rank || "Your Rank"}</h4>
          <span class="smallTitle text"><strong>SIRB:</strong>${user.sirb || "Your CDC"}</span>

          <div class="section">
            <h3 class="text title">Self-Description ✍</h3>
            <p class="text paragraph">${user.objective || "Your Description"}</p>
          </div>

          ${skills.length > 0 ? `
            <div class="section"> 
              <h3 class="text title">Skills 🧠</h3>
             
                ${skills.map(s => `
                  <div class="paragraph list">
                    ${s.skillName} (${s.level})
                  </div>
                `).join("")}
   
            </div>
          ` : ""}
        ${certificates.length > 0 ? `
            <div class="section">
              <h3 class="text title">Certificates 🏅</h3>

                ${certificates.map(s => `
                  <div class="paragraph list">
                   ${s.title} (Valid from ${formatShortDate(s.issuedDate)} to ${s.expiredDate ? formatShortDate(s.expiredDate) : "---"})

                  </div>
                `).join("")}
   
            </div>
          ` : ""}
          ${seaTimeRecords.length > 0 ? `
            <div class="section">
              <h3 class="text title">Work Experience ⛴</h3>
               
                ${seaTimeRecords.map(w => `
                   <div class="smallTitle">
                   <strong >${w.companyName}</strong><span class="smallText"> (${formatShortDate(w.fromDate)}-${w.toDate ? formatShortDate(w.toDate) : "---"})
                  </span>
                  <p class="paragraph"><strong>"${w.workDescription}"</strong></p>
                  </div>
                  
                `).join("")}
                   </div>
           
          ` : ""}
       
         </div>
      </div>
      </body>
    </html>
  `;
}
