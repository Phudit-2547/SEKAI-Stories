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
            <h2>Notice</h2>
            <p>Few updates have been made!</p>
            <ul>
                <li>
                    Introducing Dialogue Box Types! Choose from Default Dialogue
                    Box, Old Dialogue Box, or MYSEKAI's Dialogue Box!
                </li>
                <li>
                    Scene Text Box Types are also added to match the look of the
                    scene text and the dialogue box!
                </li>
                <li>Updated Chinese (Simplified) and Filipino Translation</li>
            </ul>
            <p>
                You can also view the announcement on Ko-fi. (It's been long
                since I touched it xD)
            </p>
            <button
                className="btn-regular btn-blue"
                onClick={() => {
                    window.open(
                        "https://ko-fi.com/post/SEKAI-Stories-New-Updates-D1D01TE4P7",
                        "_blank",
                    );
                }}
            >
                Ko-fi Announcement
            </button>
            <p>Tap this section to close.</p>
        </div>
    );
};

export default Announcements;
