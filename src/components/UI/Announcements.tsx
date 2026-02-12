import React, { useContext } from "react";
import { SettingsContext } from "../../contexts/SettingsContext";
import { announcementKey } from "../../data/Constants";

const Announcements: React.FC = () => {
    const context = useContext(SettingsContext);

    if (!context) return;

    const { setShowAnnouncements } = context;

    const handleAnnouncements = () => {
        setShowAnnouncements(false);
        const cookie = localStorage.getItem(announcementKey);
        if (!cookie) {
            localStorage.setItem(announcementKey, "0");
            return;
        }
        localStorage.setItem(announcementKey, `${Number(cookie) + 1}`);
    };

    return (
        <div id="announcements" onClick={handleAnnouncements}>
            <h2>Comment your ships!</h2>
            <p>
                The top three most upvoted ships will have a special default
                scene of them holding hands this Valentine's!
            </p>

            <p>Participate on the discussion on this Reddit thread!</p>
            <button
                className="btn-regular btn-orange"
                onClick={() => {
                    window.open(
                        "https://www.reddit.com/r/PJSKStories/comments/1r1ygfj/comment_your_ship/",
                        "_blank",
                    );
                }}
            >
                Reddit Thread
            </button>
            <p>Tap this section to close.</p>
        </div>
    );
};

export default Announcements;
