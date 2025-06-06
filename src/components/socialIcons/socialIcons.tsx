"use client";

import dynamic from "next/dynamic";

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
const SocialIcons = () => {
  return (
    <>
      <div>
        <a href="">
          <FacebookIcon color="action" fontSize="large" />
        </a>
      </div>
      <div>
        <a href="">
          <LinkedInIcon color="action" fontSize="large" />
        </a>
      </div>
      <div>
        <a href="">
          <YouTubeIcon color="action" fontSize="large" />
        </a>
      </div>
      <div>
        <a href="">
          <InstagramIcon color="action" fontSize="large" />
        </a>
      </div>
    </>
  );
};

export default SocialIcons;
