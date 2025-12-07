export const cvStyles = `
html, body {
  height: 100%;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}
body {
    font-family: sans-serif;
    font-size: 12px;

}
.container{
  display:flex;
  min-height:100vh;   
}

.container {
    display: flex;
    flex-direction: row;
}

.leftColumn {
    width: 40%;
    background-color: #205E95;
    text-align: center;
    color: #fff;
    min-height:100vh;
}

.rightColumn {
    width: 60%;
    padding-left: 40px;
    padding-top: 16px;
}

.profilePic {
    width: 170px;
    height: 170px;
    border-radius: 50%;
    object-fit: cover;
    margin: 16px auto;
    overflow: hidden;
}

.profilePic img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.text {
    margin: 5px 0;
}

.rightColumn .text {
    color: #205E95;
    text-align: left;
}

.leftText {
    
    margin: 1px 0;
    text-align: left;
    width: 100%;
}

.userName {
    font-size: 23px;
    font-weight: bolder;
}

.smallTitle {
    font-size: 17px;
    color: #205E95;
}

.section {
    padding: 8px 0;
}

.title {
    font-size: 18px;
    font-weight: bold;
    width: 90%;
    padding-bottom: 6px;
    border-bottom: #205E95 2px solid;
}

.subTitle {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 4px;
    color: #205E95;
}

.paragraph {
    font-size: 14px;
    line-height: 1.5;
    width: 100%;
    word-wrap: break-word;
    word-break: break-all;
    
}
.smallText{
    font-size: 12px;}
.iconContainer {
    margin-top: 0.3px;
    width: 5%;
    font-size: 10px;
}

.leftColumn .section {
    padding:7px 23px;
}

.leftColumn .title {
    text-align: left;
}

.list {
    color: #205E95;
    margin: 4px 0;
    position: relative;
    padding: 0 12px;

}

.list::before {
    content: "";
    position: absolute;
    left: 0%;
    top: 25%;
    // transform: translateY(-50%);
    width: 6px;
    height: 6px;
    background-color: #0e64af;
    border-radius: 50%;
}
.leftColumn .list{
color: #fff;
text-align: left;}

.leftColumn .list::before {
    left: 2px;
    background-color: #fff;
}
    .leftInner {
    margin : 2px 0;}
`;
export default cvStyles;