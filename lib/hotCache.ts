

export default class HotCache<T> {
  cache: Map<string, T> = new Map()
  updateMap: Map<string, string> = new Map()

  //1980839624 / 1000 / 60 / 60  / 24
  async getData(key: string, remoteGetter: () => T): Promise<T> {
    console.log('Getting ' + key + ' from hot cache');
    if (this.cache.has(key) && this.updateMap.has(key)) {
      console.log("Value found");
      const previousGetdate = new Date(this.updateMap.get(key) as string)
      const elapsedTimeInHours = (new Date().getTime() - previousGetdate.getTime()) / 1000 / 60 / 60
      if (elapsedTimeInHours < 5) {
        console.log("Within predefined time");
        return this.cache.get(key) as T
      }
    }
    console.log("Getting from remote getter");
    const newValue = await remoteGetter();
    this.updateMap.set(key, new Date().toISOString())
    this.cache.set(key, newValue)
    return newValue
  }
}