import cvStyles from "../style/cvStyles";
export default function generateCVHtml(user) {
  return `
    <html>
      <head>
        <meta charset="UTF-8" />
         <style>
          ${cvStyles}
        </style>
      </head>
     <body >
      <div class="container">
        <div class="leftColumn">
        <img src="${user.image}" class="profilePic" alt="profile picture"/>
        <div class="userName">${user.name || "Your Name"}</div>
        </div>
        <div class="rightColumn">
        </div>
      </div>
      </body>
    </html>
  `;
}
