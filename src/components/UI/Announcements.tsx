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
            <p>
                With 35 mentioned character ships, for today's Valentine ships
                are...
            </p>
            <p>
                AkiToya, MizuKana, RuiKasa, and (as a bonus) MizuMafu and
                HonaKana!
            </p>
            <p>
                (someone also commented "mafuyu x therapy" so have that as a
                bonus as well xD)
            </p>
            <br></br>
            <p>There is one update I have done too.</p>
            <ul>
                <li>
                    <p>Added "Re-apply All" button for Live2D Parameters.</p>
                </li>
            </ul>
            <p>Happy Valentine's Day, everyone! ♡</p>
            <p>Tap this section to close.</p>
        </div>
    );
};

export default Announcements;
