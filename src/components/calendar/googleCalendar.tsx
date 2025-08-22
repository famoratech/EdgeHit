import React from "react";

// Define the props for the component. The iframeString is required.
// You can also pass custom styles if needed.
interface GoogleCalendarEmbedProps {
  iframeString?: string;
  className?: string;
}

/**
 * A reusable Next.js component to embed a Google Calendar iframe.
 * The iframe content is passed as a string and rendered using
 * dangerouslySetInnerHTML. This is the standard approach for
 * embedding external content like this.
 */
const GoogleCalendarEmbed: React.FC<GoogleCalendarEmbedProps> = ({
  iframeString,
  className = "",
}) => {
  // Replace the defaultIframe code with your new, interactive booking page code.
  // This is a placeholder example of what it might look like.
  const defaultIframe =
    '<iframe src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ2w-5gT6WpIX5LXLO9vKS0UqexkgdVABUY_9bGoW500y9JQ3Xj5AhfRA_a35jZ_e7aWqwQ95cKN?gv=true" style="border: 0" width="100%" height="600" frameborder="0"></iframe>';

  // Use the provided string if available, otherwise use the default.
  const htmlContent = iframeString || defaultIframe;

  return (
    // The main container for the calendar, using Tailwind CSS for centering and padding.
    // This ensures the component is responsive and looks good on all devices.
    <div
      className={`flex justify-center items-center p-4 md:p-8 mt-10 mb-10 ${className}`}
    >
      {/* The dangerouslySetInnerHTML prop is used to render the raw HTML string.
        It is a React feature that allows you to set HTML directly from code.
        Since we are using a trusted source (Google Calendar), this is safe and necessary.
      */}
      <div
        className="rounded-lg shadow-xl overflow-hidden max-w-full"
        style={{ width: "100%", maxWidth: "800px" }} // Set a max-width to control the calendar size on larger screens.
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>
  );
};

export default GoogleCalendarEmbed;
