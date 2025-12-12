import React, { useContext } from "react";
import { SettingsContext } from "../../contexts/SettingsContext";

const Announcements: React.FC = () => {
    const context = useContext(SettingsContext);

    if (!context) return;

    const { setHideAnnouncements } = context;

    const handleAnnouncements = () => {
        setHideAnnouncements(true);
        const cookie = localStorage.getItem("5.9.0-announcements");
        if (!cookie) {
            localStorage.setItem("5.9.0-announcements", "0");
            return;
        }
        localStorage.setItem("5.9.0-announcements", `${Number(cookie) + 1}`);
    };

    return (
        <div id="announcements" onClick={handleAnnouncements}>
            <h2>Notice</h2>
            <p>New features have been added!</p>
            <ul>
                <li>
                    Inspired from the recent Ena5 event, POV/FOV (or Camera)
                    Filter has been added!
                </li>
                <li>Blur Transform on models has been added.</li>
            </ul>
            <p>Tap this section to close.</p>
        </div>
    );
};

export default Announcements;
