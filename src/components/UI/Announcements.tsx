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
            <p>Few updates has been made:</p>
            <ul>
                <li>
                    You can now make your own choices text! (I'll be waiting
                    your "choose your own path" stories.)
                </li>
                <li>Updated list of models and backgrounds.</li>
                <li>Updated the tutorial with the recent features.</li>
            </ul>

            <p>Tap this section to close.</p>
        </div>
    );
};

export default Announcements;
