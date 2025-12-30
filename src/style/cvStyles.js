
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
  width: 100%;
  
}

.leftColumn {
    width: 100%;
    display:flex;
    color: #205E95;
    justify-content: center;
    align-items: center;
}
.imgContainer {
    width: 30%;
    text-align: center;
    justify-content: center;

}
.rightColumn {
    width: 100%;
    display:flex;
    flex-direction: row;
    align-items: stretch;
    padding-top: 16px;
    justify-content: space-between;
    flex-wrap: wrap;    
   
}

.profilePic {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid #205E95;
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
    color:#205E95;
}

.rightColumn .text {
   
    text-align: left;
   padding-right: 0;
}
.rightColumn .section {
width:45%;
}
.leftText {
    display: flex;
    flex-direction: row;   /* key change */
    align-items: center;   /* vertical alignment */
    width: 100%;
    margin: 1px 0;
    color: #205E95;
    flex-wrap: wrap;
}

.leftText .paragraph {
    font-weight: 450;
   line-height: 1;
    display:inline-block;
}

.userName {
    font-size: 30px;
    font-weight: bolder;
  
}

.smallTitle {
    font-size: 18px;
    color: #205E95;
}

.section {
    padding: 8px 0;
}
.section .subSec {
    margin-bottom: 15px ;
    }

.title {
    font-size: 20px;
    font-weight: bold;
    width: 100%;
    padding-bottom: 6px;
    border-bottom: #205E95 2px solid;
}

.subTitle {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
    color: #205E95;
}
.rightColumn .paragraph {
    padding-left: 12px;
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
    margin-top: 6px;
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
    padding-left: 0;
 border: none;
}
.edu {
margin :10px 0;
padding-left: 12px;
}
.list {
    color: #205E95;
    margin: 4px 0;
    position: relative;
    padding: 0 20px!important;

}

.list::before {
    content: "";
    position: absolute;
    left: 6px;
    top: 45%;
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
    width:69%;

    }
.tableContainer {
padding-top: 15px;
    width: 100%;
    color: #205E95;
    }
.tableContainer .title {
    padding-left: 6px;
    color: #205E95;
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