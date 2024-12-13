async function getData() {
  const url = "https://data.gov.bh/api/explore/v2.1/catalog/datasets/01-statistics-of-students-nationalities_updated/records?where=colleges%20like%20%22IT%22%20AND%20the_programs%20like%20%22bachelor%22&limit=100";
  try {
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      const records = data.results || [];
      const tableBody = document.getElementById("data-table-body");

      if (records.length === 0) {
          console.warn("No records found in the API response.");
          return;
      }

      records.forEach(record => {
          const fields = record; 
          if (!fields) {
              console.warn("Missing fields in record:", record);
              return; 
          }


          const row = document.createElement("tr");
          row.innerHTML = `
              <td>${fields.year || "N/A"}</td>
              <td>${fields.semester || "N/A"}</td>
              <td>${fields.the_programs || "N/A"}</td>
              <td>${fields.nationality || "N/A"}</td>
              <td>${fields.colleges || "N/A"}</td>
              <td>${fields.number_of_students || "N/A"}</td>
          `;
          tableBody.appendChild(row);
      });
  } catch (error) {
      console.error("Error fetching data:", error);
  }
}

getData();
