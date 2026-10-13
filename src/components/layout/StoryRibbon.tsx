export function StoryRibbon() {
  const words = [
    "Language",
    "Learning",
    "Leadership",
    "Compassion",
    "New chapters",
  ];
  return (
    <div className="story-ribbon" aria-hidden="true">
      <div data-ribbon-track className="story-ribbon-track">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {words.map((word) => (
              <span key={word} className="inline-flex items-center gap-10 px-5">
                <span className="font-serif text-2xl italic sm:text-3xl">
                  {word}
                </span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 0C12 9 15 12 24 12C15 12 12 15 12 24C12 15 9 12 0 12C9 12 12 9 12 0Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
