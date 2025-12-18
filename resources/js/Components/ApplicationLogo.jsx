export default function ApplicationLogo(props) {
    return (
        <svg {...props} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Background Kotak Rounded Gradient */}
            <rect width="200" height="200" rx="60" fill="url(#paint0_linear_logo_app)"/>
            
            {/* Lingkaran Luar */}
            <circle cx="100" cy="100" r="55" stroke="white" strokeWidth="12"/>
            
            {/* Simbol Dollar ($) */}
            <path d="M100 65V135M100 65C115 65 125 75 125 85C125 95 115 100 100 100M100 65C85 65 75 75 75 85C75 95 85 100 100 100M100 135C85 135 75 125 75 115C75 105 85 100 100 100M100 135C115 135 125 125 125 115C125 105 115 100 100 100" stroke="white" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round"/>
            
            {/* Definisi Warna Gradient Ungu */}
            <defs>
                <linearGradient id="paint0_linear_logo_app" x1="26.5" y1="26.5" x2="173.5" y2="173.5" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#8B5CF6"/> {/* Ungu Terang */}
                    <stop offset="1" stopColor="#6D28D9"/> {/* Ungu Gelap */}
                </linearGradient>
            </defs>
        </svg>
    );
}