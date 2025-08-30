"use client";

import dynamic from "next/dynamic";
import { styled } from "@mui/system";
import { keyframes } from "@emotion/react";

// Define a bounce animation
const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

// Styled icon wrapper with animation
const IconWrapper = styled("div")({
  transition: "all 0.3s ease",
  "&:hover": {
    animation: `${bounce} 0.5s ease`,
    "& a": {
      color: "#FF6B6B !important",
    },
  },
  "& a": {
    display: "flex",
    alignItems: "center",
    padding: "0.5rem", // Internal spacing
    color: "#FFA500", // Default icon color
    textDecoration: "none",
    fontSize: "2.2rem",
    fontWeight: "bold",
    borderRadius: "50%",
    margin: "0.8rem",
    width: "3rem",
    height: "3rem",
    backgroundColor: "rgba(255, 255, 255, 0.1)", // Subtle background
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",

    justifyContent: "center",
    transition: "color 0.3s ease",
  },
});

const FacebookIcon = dynamic(() => import("@mui/icons-material/Facebook"), {
  ssr: false,
});
const LinkedInIcon = dynamic(() => import("@mui/icons-material/LinkedIn"), {
  ssr: false,
});
const YouTubeIcon = dynamic(() => import("@mui/icons-material/YouTube"), {
  ssr: false,
});
const InstagramIcon = dynamic(() => import("@mui/icons-material/Instagram"), {
  ssr: false,
});

const XIcon = dynamic(() => import("@mui/icons-material/X"), {
  ssr: false,
});

const SocialIcons = () => {
  return (
    <>
      <IconWrapper>
        <a href="#" target="_blank" aria-label="Facebook">
          <FacebookIcon sx={{ color: "#FFA500", fontSize: "2.2rem" }} />
        </a>
      </IconWrapper>
      <IconWrapper>
        <a
          href="https://www.linkedin.com/company/edge-hit/?viewAsMember=true"
          target="_blank"
          aria-label="LinkedIn"
        >
          <LinkedInIcon sx={{ color: "#FFA500", fontSize: "2.2rem" }} />
        </a>
      </IconWrapper>
      <IconWrapper>
        <a href="https://x.com/edge_hit" target="_blank" aria-label="X">
          <XIcon sx={{ color: "#FFA500", fontSize: "2.2rem" }} />
        </a>
      </IconWrapper>
      <IconWrapper>
        <a href="#" target="_blank" aria-label="Instagram">
          <InstagramIcon sx={{ color: "#FFA500", fontSize: "2.2rem" }} />
        </a>
      </IconWrapper>
    </>
  );
};

export default SocialIcons;
