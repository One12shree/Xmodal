import { useEffect, useState } from "react";

export default function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const styles = {
    // ... (Your entire original styles object remains here, unchanged)
    page: {
      fontFamily: "sans-serif",
      background: "#1e293b",
      minHeight: "100vh",
      padding: "20px",
    },
    container: {
      maxWidth: "1200px",
      margin: "auto",
    },
    title: {
      color: "white",
      textAlign: "center",
      marginBottom: "20px",
      fontSize: "28px",
      fontWeight: "bold",
    },
    searchBox: {
      width: "100%",
      padding: "12px",
      fontSize: "16px",
      borderRadius: "8px",
      border: "none",
      marginBottom: "25px",
    },
    grid: {
      display: "flex",
      flexWrap: "wrap",
      gap: "20px",
      justifyContent: "center",
    },
    card: {
      width: "160px",
      background: "white",
      padding: "15px",
      borderRadius: "10px",
      textAlign: "center",
      boxShadow: "0 3px 6px rgba(0,0,0,0.15)",
    },
    flag: {
      width: "100%",
      height: "90px",
      objectFit: "cover",
      borderRadius: "6px",
    },
    name: {
      marginTop: "10px",
      fontWeight: 600,
      color: "#333",
    },
    loading: {
      color: "white",
      textAlign: "center",
      fontSize: "22px",
      marginTop: "40px",
    },
  };

  // API CALL
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://xcountries-backend.labs.crio.do/all"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch");
        }

        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error("Error fetching data:", error); // required by tests
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  // ✅ CORRECTED FILTER LOGIC: Shows all when search is empty, otherwise uses exact match
  const filteredCountries = countries.filter((country) => {
    // Check if search is empty or only whitespace
    if (search.trim() === "") {
      return true; // Return all countries
    }
    
    // Strict exact match (case-insensitive)
    return country.name.toLowerCase() === search.toLowerCase();
  });

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>Country Flags</h1>

        {/* SEARCH BOX */}
        <input
          type="text"
          placeholder="Search for a country..."
          style={styles.searchBox}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {loading ? (
          <p style={styles.loading}>Loading...</p>
        ) : (
          <div style={styles.grid}>
            {filteredCountries.map((country) => (
              <div key={country.name} className="countryCard" style={styles.card}>
                <img
                  src={country.flag}
                  alt={country.name}
                  style={styles.flag}
                  referrerPolicy="no-referrer"
                />
                <p style={styles.name}>{country.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}