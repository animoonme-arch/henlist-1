import Advertize from "@/components/Advertize/Advertize";

// src/app/[id]/page.jsx
export const dynamic = "force-dynamic";

export default function AdOnlyPage() {
    const DEFAULT_AD_LINK =
        "https://capriceawelessaweless.com/ukqgqrv4n?key=acf2a1b713094b78ec1cc21761e9b149";
    let dynamicAdLink = DEFAULT_AD_LINK;
    return (
        <main
            style={{
                minHeight: "100vh",
                background:
                    "linear-gradient(180deg, #0f0f1a 0%, #141428 40%, #0b0b14 100%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingTop: "24px",
                color: "#fff",
            }}
        >
            <Advertize initialAdLink={dynamicAdLink} />
            {/* Top Message */}
            <div
                style={{
                    marginBottom: "24px",
                    textAlign: "center",
                    animation: "floatAnim 2.5s ease-in-out infinite",
                }}
            >
                <div
                    style={{
                        fontSize: "1.25rem",
                        fontWeight: 700,
                        background: "linear-gradient(90deg, #ffb347, #ffcc33)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}
                >
                    Sponsored Content
                </div>
                <div
                    style={{
                        marginTop: "6px",
                        fontSize: "0.9rem",
                        opacity: 0.75,
                    }}
                >
                    Scroll down to continue ⬇
                </div>
            </div>

            {/* Ads */}
            {Array.from({ length: 5 }).map((_, i) => (
                <div
                    key={i}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                        padding: "10px 0",
                        marginBottom: "16px",
                        background:
                            "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(0,0,0,0))",
                        borderRadius: "14px",
                    }}
                >
                    <iframe
                        src="/ad"
                        title={`Sponsored Ad ${i + 1}`}
                        scrolling="no"
                        loading="eager"
                        style={{
                            width: "100%",
                            maxWidth: "728px",
                            height: "80px",
                            border: "none",
                            borderRadius: "12px",
                            backgroundColor: "#201f31",
                            boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
                        }}
                    />
                </div>
            ))}

            {/* Inline animation (safe for Server Components) */}
            <style
                dangerouslySetInnerHTML={{
                    __html: `
          @keyframes floatAnim {
            0% { transform: translateY(0); }
            50% { transform: translateY(6px); }
            100% { transform: translateY(0); }
          }
        `,
                }}
            />
        </main>
    );
}
