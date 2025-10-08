import React from "react";
import { useNavigate } from "react-router-dom";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import myImage from "./image.png";
import { useMediaQuery, Box, Typography, Button, Container } from "@mui/material"; 
const doctors = [
  {
    name: "Dr. Santosh Shankar Desai",
    specialty: "B.H.M.S, C.C.H Hom",
    image: myImage,
    alt: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
    qualification: "B.H.M.S, C.C.H Hom",
    bio: "Specializes in kideny stone, treatments for over 15 years.",
    hospital: "Shrividhya Clinic , Shreeya Clinic",
    experience: "25 years",
    instagram: "https://www.instagram.com/dr.santosh_desai_palus",
    facebook: "https://www.facebook.com/santosh.desai.5811",
  },
  {
    name: "Dr. Rohini Santosh Desai",
    specialty: "B.H.M.S , M.D Hom",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s",
    bio: "Specializes in skin care, treatments for over 10 years.",
    qualification: "MD.Hom",
    hospital: "Shrividhya Clinic , Shreeya Clinic",
    experience: "25 years",
    instagram: "https://www.instagram.com/dr.santosh_desai_palus",
    facebook: "https://www.facebook.com/santosh.desai.5811",
  },
];

const Homepage = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:960px)');

  return (
    <Box
      sx={{
        minHeight: "100vh",
        p: { xs: 2, sm: 3, md: 4 },
        fontFamily: "'Segoe UI', sans-serif",
        color: "#1e293b",
        backgroundColor: "#e6f2f8",
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.6), rgba(255,255,255,0.6)),
          url('https://s7d1.scene7.com/is/image/CENODS/10126-cover8-dnaopener?$hero$&fmt=webp')
        `,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "cover",
        backgroundSize: "cover",
        backgroundBlendMode: "soft-dark",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant={isMobile ? "h4" : "h3"}
          sx={{
            mb: { xs: 3, md: 5 },
            fontWeight: "600",
            textAlign: "center",
            color: "#0f172a",
            px: { xs: 2, sm: 0 }
          }}
        >
          Welcome to Our Healthcare Portal
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: { xs: 2, sm: 3, md: 4 },
            flexWrap: "wrap",
            width: "100%",
          }}
        >
          {doctors.map((doc, index) => (
            <Box
              key={index}
              sx={{
                background: "rgba(255,255,255,0.95)",
                borderRadius: "16px",
                width: { xs: "100%", sm: "calc(50% - 16px)", md: "300px" },
                maxWidth: { xs: "400px", md: "300px" },
                p: { xs: 2, sm: 2.5 },
                boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                cursor: "default",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: "0 12px 28px rgba(0,0,0,0.25)",
                },
              }}
            >
              <Box
                component="img"
                src={doc.image}
                alt={doc.name}
                sx={{
                  width: "100%",
                  borderRadius: "12px",
                  mb: 2,
                  objectFit: "cover",
                  height: { xs: "200px", sm: "220px", md: "260px" },
                }}
              />
              <Typography 
                variant={isMobile ? "h6" : "h5"} 
                sx={{ 
                  mb: 0.5, 
                  color: "#0f172a",
                  fontSize: { xs: "1.1rem", sm: "1.25rem" }
                }}
              >
                {doc.name}
              </Typography>
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  mb: 1.5, 
                  fontWeight: "500", 
                  color: "#334155",
                  fontSize: { xs: "0.9rem", sm: "1rem" }
                }}
              >
                {doc.specialty}
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  fontSize: { xs: "0.8rem", sm: "0.875rem" }, 
                  lineHeight: 1.6, 
                  color: "#475569",
                  mb: 1
                }}
              >
                {doc.bio}
              </Typography>

              <Typography 
                variant="body2" 
                sx={{ 
                  mt: 1, 
                  fontSize: { xs: "0.75rem", sm: "0.875rem" }, 
                  color: "#1e293b" 
                }}
              >
                <strong>Qualification:</strong> {doc.qualification}
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  fontSize: { xs: "0.75rem", sm: "0.875rem" }, 
                  color: "#1e293b" 
                }}
              >
                <strong>Hospital:</strong> {doc.hospital}
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  fontSize: { xs: "0.75rem", sm: "0.875rem" }, 
                  color: "#1e293b",
                  mb: 2
                }}
              >
                <strong>Experience:</strong> {doc.experience}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  fontSize: { xs: "1.2rem", sm: "1.375rem" },
                }}
              >
                <Box
                  component="a"
                  href={doc.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ 
                    color: "#e11d48",
                    textDecoration: "none",
                    "&:hover": { opacity: 0.8 }
                  }}
                >
                  <FaInstagram />
                </Box>
                <Box
                  component="a"
                  href={doc.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ 
                    color: "#2563eb",
                    textDecoration: "none",
                    "&:hover": { opacity: 0.8 }
                  }}
                >
                  <FaFacebook />
                </Box>
              </Box>
            </Box>
          ))}
        </Box>

        <Box sx={{ textAlign: "center", mt: { xs: 4, md: 6 } }}>
          <Button
            onClick={() => navigate("/login")}
            variant="contained"
            size={isMobile ? "medium" : "large"}
            sx={{
              px: { xs: 3, sm: 4 },
              py: { xs: 1.5, sm: 2 },
              fontSize: { xs: "1rem", sm: "1.125rem" },
              borderRadius: 2,
              background: "linear-gradient(45deg, #0f62fe, #3b82f6)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              "&:hover": {
                background: "linear-gradient(45deg, #1d4ed8, #2563eb)",
                boxShadow: "0 6px 16px rgba(0,0,0,0.3)",
              },
            }}
          >
            Set Appointment
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Homepage;
