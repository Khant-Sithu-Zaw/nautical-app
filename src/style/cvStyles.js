
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
  alignItems: 'stretch';
  
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

}

.rightColumn {
    width: 60%;
    padding-left: 40px;
    padding-top: 16px;
    border-bottom: 3px solid #205E95;
}

.profilePic {
    width: 170px;
    height: 170px;
    border-radius: 50%;
    object-fit: cover;
    margin: 25px auto 10px;
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
    font-size: 28px;
    font-weight: bolder;
}

.smallTitle {
    font-size: 18px;
    color: #205E95;
}

.section {
    padding: 8px 0;
}

.title {
    font-size: 20px;
    font-weight: bold;
    width: 90%;
    padding-bottom: 6px;
    border-bottom: #205E95 2px solid;
}

.subTitle {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 4px;
    color: #205E95;
}

.paragraph {
    font-size: 17px;
    line-height: 1.5;
    width: 100%;
    word-wrap: break-word;
    word-break: break-all;
    
}
.smallText{
    font-size: 15px;
    }
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
.edu {
margin :10px 0;
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
    top: 40%;
    transform: translateY(-30%);
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
    margin : 2px 0;
    }
.tableContainer{
padding-top: 15px;
    width: 100%;
    color: #205E95;
    }
.tableContainer .title {
    padding-left: 6px;
    }
.certTable {
  width: 100%;
  border-collapse: collapse;
  margin: 8px 0;
  table-layout: fixed;
}

.certTable th, .certTable td {
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
  max-width: 0;
  padding: 6px 8px;
  text-align: left;
  font-size: 16px;
}

.certTable th {
  background-color: #205E95;
  color: #fff;
   border: 1px solid #fff;
}

.certTable td {
  background-color: #f2f2f2;
  color: #205E95;
   border: 1px solid #205E95;
}
.additionalInfo{
    display: flex;
    justifyContents: space-between;
    width: 100%;
    
}

.additionalInfo .leftInfo{
    width: 45%;
    padding:0 5px;
    }
    .additionalInfo p {
    font-size: 16px;
    font-weight: 500;
    }
    .additionalInfo p span {
    font-weight: 700;
    }
.additionalInfo .rightInfo{
    width: 50%;
 padding:0 5px;
    }
`;
export default cvStyles;