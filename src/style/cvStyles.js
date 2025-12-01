export const cvStyles = `
body {
  font-family: sans-serif;
  font-size: 2vw;
  
}

.container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.leftColumn {
  width: 50%;
  background-color: red; /* FIXED */
  padding: 1vw;
}

.rightColumn {
  width: 50%;
  padding: 1vw;
}

.profilePic {
  width: 20vw;
  height: 20vw;
  border-radius: 50%;
  object-fit: cover; /* ensures image fits */
}

.userName {
  font-size: 4vw;
  font-weight: bold;
  margin-top: 1vw;
}
`;
export default cvStyles;
