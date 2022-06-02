import produce from 'immer'

export const storeFeatures = (set:any) => ({
  features: {
    dev: false,
    cloud: false,
    wled: false,
    integrations: false,
    spotify: false,
    spotifypro: false,
    youtube: false,
    webaudio: false,
    waves: false,
    streamto: false,
    effectfilter: false,
    transitions: false,
    frequencies: false,
    go: false
  },
  showFeatures: {
    dev: false,
    cloud: false,
    wled: false,
    integrations: false,
    spotify: false,
    spotifypro: false,
    youtube: false,
    webaudio: false,
    waves: false,
    streamto: false,
    effectfilter: false,
    transitions: false,
    frequencies: false,
    go: false
  },
  setFeatures: (feat: string, use:boolean):void => set(produce((state:any) => { state.features[feat] = use }), false, "ui/setFeature"),
  setShowFeatures: (feat: string, show:boolean):void => set(produce((state:any) => { state.showFeatures[feat] = show }), false, "ui/setShowFeature"),
})
