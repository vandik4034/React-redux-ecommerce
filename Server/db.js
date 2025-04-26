// import sql from "mssql";

// export const config = {
//   server: "DESKTOP-EQ55Q8H\\SPART",
//   database: "ecommerce",
//   options: {
//     trustServerCertification: true,
//     encrypt: false,
//   },

//   authentication: {
//     type: "default",
//     options: {
//       userName: "sa",
//       password: "Hardik@8153",
//       domain: "yourDomainname",
//     },
//   },
// };

// const connectToDB = async () => {
//   try {
//     const pool = await sql.connect(config);
//     console.log(" SQL Server connect sucessful");
//     return pool;
//   } catch (err) {
//     console.error(" Error:", err);
//     throw err;
//   }
// };

// export { connectToDB, sql };
