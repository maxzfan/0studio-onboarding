// Central source of truth for release information
// Update this file when shipping new releases - the landing page will automatically reflect the latest feature

export const releases = [
  {
    version: "v1.0.1",
    features: [
      "user login & data sync",
      "push & pull from cloud"
    ]
  },
  {
    version: "v1.0.0",
    features: [
      "local branching history",
      "gallery view",
      "filter & search commit messages"
    ]
  }
]

// Helper to get the latest release's first feature (used on landing page)
export const getLatestFeature = () => {
  if (releases.length === 0 || releases[0].features.length === 0) {
    return "new features"
  }
  return releases[0].features[0]
}
