import reset from "../style/reset";
import cvStyles from "../style/cvStyles";
import { formatShortDate } from "./methods";
export default function generateCVHtml(user) {
  const educations = user?.educations || [];
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
    <div>
      <div class="container">
        <div class="leftColumn">
          <img src="${user.image}" class="profilePic" alt="profile picture"/>
             <div class="section leftInner">
                <h3 class="title">Personal Info</h3>
                 
                <div class="leftText">
                  
                </div>
                <div class="leftText">
                    <p class="paragraph"> 🎂 ${user.birthday}</p>
                </div>
                <div class="leftText">
                    <p class="paragraph">🌐 ${user.nationality}</p>
                </div>
                <div class="leftText">
                  <p class="paragraph">${user.gender?.toLowerCase() === "male" ? "♂️" : "♀️"} ${user.gender}</p>
                 </div>
                 <div class="leftText">
                  <p class="paragraph">🧍${user.height} cm</p>
                 </div>
                 <div class="leftText">
                  <p class="paragraph">⏲️ ${user.weight} kg</p>
                 </div>
                <div class="leftText">
                  <p class="paragraph">👩🏻‍❤️‍👨🏻 ${user.martialSts}</p>
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
          
            
        </div>

        <div class="rightColumn">
          <h2 class="text userName">${user.name || "Your Name"}</h2>
          <h4 class="text subTitle">Rank: ${user.rank || "Your Rank"}</h4>
          <div class="section">
            <h3 class="text title">Self-Description ✍</h3>
            <p class="text paragraph">${user.objective || "Your Description"}</p>
          </div>
          ${educations.length > 0 ? `
            <div class="section">
              <h3 class="text title">Education 🎓</h3>
                ${educations.map(edu => `
                <div class="smallTitle edu">
                <strong>${edu.eduName}</strong>
                  <br>
                <span class="smallText"> (${formatShortDate(edu.eduFromDate)} - ${formatShortDate(edu.eduToDate)})</span>
            </div>
          `).join("")}
            </div>
          ` : ""}
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
         ${user.hobbies && user.hobbies.length > 0 ? `
            <div class="section">
            <h3 class="text title">Hobbies</h3>
             
                ${user.hobbies.map(h => `
                  <div class="paragraph list">
                    ${h} 
                  </div>
                `).join("")}
   
            </div>
          ` : ""}
        </div>
      </div>
      <div class="tableContainer">
      <div class="section">
    <h3 class="text title">Seafarer Documents 📘</h3>

    <table class="certTable">
      <thead>
        <tr>
          <th>Book No</th>
          <th>Type</th>
          <th>Validity</th>
          <th>Place of Issue</th>

        </tr>
      </thead>
      <tbody>
          <tr>
            <td> ${user.cdc.sirb}</td>
             <td>SIRB </td>
            <td> <strong>${user.cdc.issuedDate}</strong> to <strong>${user.cdc.expiredDate}</strong></td>
            <td>${user.cdc.issuedPlace} </td>
          </tr>
          <tr>
            <td>${user.passport.pno}</td>
              <td>Passport </td>
             <td> <strong>${user.passport.issuedDate}</strong> to <strong>${user.passport.expiredDate}</strong></td>
            <td>${user.passport.issuedPlace} </td>
          </tr>
      </tbody>
    </table>

  </div>
      ${certificates.length > 0 ? `
  <div class="section">
    <h3 class="text title">Certificates 🏅</h3>

    <table class="certTable">
      <thead>
        <tr>
          <th>Certificate</th>
          <th>Valid Duration</th>
          <th>Country</th>
        </tr>
      </thead>
      <tbody>
        ${certificates.map(s => `
          <tr>
            <td>${s.title}</td>
            <td><strong>${formatShortDate(s.issuedDate)}</strong> to <strong>${s.expiredDate ? formatShortDate(s.expiredDate) : "---"}</strong></td>
            <td>${s.country}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>

  </div>
` : ""}
      ${certificates.length > 0 ? `
  <div class="section">
    <h3 class="text title">SeaTime Records 🚢</h3>

    <table class="certTable">
      <thead>
        <tr>
          <th>SRPS</th>
          <th>IMO No</th>
          <th>Vessel <br>Name/Type</th>
          <th>From-To Date</th>
          <th>Position</th>
          <th>GRT</th>
          <th>Engine(kW)</th>
        </tr>
      </thead>
      <tbody>
        ${seaTimeRecords.map(s => `
          <tr>
            <td>${s.companyName}</td>
            <td>${s.imoNo}</td>
            <td>${s.shipName} / ${s.shipType}</td>
            <td><strong>${formatShortDate(s.fromDate)}</strong> to <br> <strong>${formatShortDate(s.toDate)}</strong></td>
            <td>${s.position}</td>
            <td>${s.grt}</td>
            <td>${s.enginePowerKW}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>

  </div>
` : ""}
 <div class="section">
    <h3 class="text title">Additional Information 📃</h3>
    <div class="additionalInfo">
          <div class="leftInfo">
          <p>Next of Kin : <span>  <td> ${user.kin.kinType}</td></span></p>
          <p>Contact : <span>  <td> ${user.kin.kinPhone}</td></span></p>
          </div>
          <div class="rightInfo">
          <p>Name : <span>  <td> ${user.kin.kinName}</td></span></p>
          <p>Address : <span>  <td> ${user.kin.kinAddr}</td></span></p>
          </div>
    </div>
    

  </div>
      </div>
    </div>
      </body>
    </html>
  `;
}
