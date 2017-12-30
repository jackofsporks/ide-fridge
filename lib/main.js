const path = require("path")
const {AutoLanguageClient} = require("atom-languageclient")

class FridgeLanguageClient extends AutoLanguageClient {
  constructor(){super(); atom.config.set("core.debugLSP", false); console.log("mememememe");}
  getGrammarScopes () {return ["source.js"]}
  getLanguageName () {return "JavaScript"}
  getServerName () {return "Sourcegraph"}

  startServerProcess () {
    return super.spawnChildNode([require.resolve("javascript-typescript-langserver/lib/language-server-stdio")])
  }

  // fridge(e){
  //   console.log("fridges on freaking bridges")
  //   // const elms = document.body.querySelectors(".item-views .line")
  //   // const elm = elms[0]
  //   // elm.style["background-color"] = "tomato"
  // }
  //
  // consumeLinterV2() {
  //   const editor = atom.workspace.getActiveTextEditor()
  //   const elm = atom.views.getView(editor)
  //   elm.addEventListener("click", this.fridge)
  //   // if (atom.config.get('ide-typescript.diagnosticsEnabled') === true) {
  //     super.consumeLinterV2.apply(this, arguments)
  //   // }
  // }

  async getSuggestions (request) {
    const server = await this._serverManager.getServer(request.editor)
    if (server == null) {
      return server.currentSuggestions = []
    }
    let sugs = server.currentSuggestions
    let prefix = request.prefix
    if (server.currentSuggestions && server.currentSuggestions.length > 0) {
      for(const sug of sugs) {
        sug.replacementPrefix = "fridge"
      }
      return server.currentSuggestions
    }
    return server.currentSuggestions
  }
}

module.exports = new FridgeLanguageClient()
