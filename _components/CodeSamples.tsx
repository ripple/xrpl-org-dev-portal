// {% extends "base.html.jinja" %}
import * as React from "react";
import preval from "babel-plugin-preval/macro";
// {% block bodyclassNamees %}no-sidebar{% endblock %}
// {% block mainclassNamees %}landing page-community{% endblock %}

// {% block main %}

interface CodeSample {
  href: string;
  title: string;
  description: string;
  langs: Array<string>;
}

export default function CodeSamples() {
  // scanner script to go through all code-samples
  const codeSamples = preval`const fs = require("fs");
  const { marked } = require("marked");
  const JSSoup = require("jssoup").default;
  const path = require('path');
  const dirPath = path.resolve(__dirname, '../_code-samples');
  const skipDirs = ["node_modules", ".git", "__pycache__"];
  
  function sortFunc(cs1, cs2) {
    /* Sort code samples alphabetically by title except with "Intro" fields first
     */
    if (cs1.title.includes("Intro")) {
      return -1; }
    else if (cs1.title.includes("Quickstart")){
        cs1.title = " " + cs1.title;
      return -1;
    } else if (cs1.title < cs2.title) {
      return -1;
    } else if (cs1.title > cs2.title) {
      return 1;
    }
    return 0;
  }
  
  function getCodeSamples(dir,codeSamplesArr = []) {
    // list files in directory and loop through
    fs.readdirSync(dir).forEach((csFile) => {
      // builds path of file
      const fPath = dir + "/" + csFile;
      if (fs.statSync(fPath).isDirectory() && !skipDirs.includes(csFile)) {
        const langs = [];
        const cs = {
          href: fPath,
        };
        // loop through each subfolder
        fs.readdirSync(fPath).forEach((file) => {
          const subPath = fPath + "/" + file;
          if (fs.statSync(subPath).isDirectory()) {
            const lang = ["websocket", "json-rpc"].includes(file) ? "http" : file;
            langs.push(lang);
          }
          if (file === "README.md") {
            const data = fs.readFileSync(subPath, "utf-8");
            const soup = new JSSoup(marked.parse(data));
            // find first title
            cs.title = soup.find("h1").text;
            // find first paragragh
            cs.description = soup.find("p").text || "";
          }
          langs.sort();
          cs.langs = langs;
          cs.href = fPath;
        });
        codeSamplesArr.push(cs);
      }
    });
    codeSamplesArr.sort(sortFunc);
    return codeSamplesArr;
  }
  module.exports = getCodeSamples(dirPath)`;
  const langIcons = {
    cli: "assets/img/logos/cli.svg",
    go: "assets/img/logos/golang.svg",
    java: "assets/img/logos/java.svg",
    js: "assets/img/logos/javascript.svg",
    py: "assets/img/logos/python.svg",
    http: "assets/img/logos/globe.svg",
  };
  const langText = {
    cli: "CLI",
    go: "go",
    java: "Java",
    js: "JavaScript",
    py: "Python",
    http: "HTTP",
  };
  const allLangs = ["cli", "go", "java", "js", "py", "http"];
  return (
    <div className="landing page-community">
      <section className="py-26">
        <div className="col-lg-8 mx-auto text-lg-center">
          <div className="d-flex flex-column-reverse">
            <h1 className="mb-0">Start Building with Example Code</h1>
            <h6 className="eyebrow mb-3">Code Samples</h6>
          </div>
          <a className="mt-12 btn btn-primary btn-arrow" href="#">
            Submit Code Samples
          </a>
        </div>
      </section>

      <div className="position-relative d-none-sm">
        <img
          src="static/img/backgrounds/xrpl-overview-orange.svg"
          id="xrpl-overview-orange"
        />
      </div>

      <section className="container-new py-26">
        <div className="d-flex flex-column col-sm-8 p-0">
          <h3 className="h4 h2-sm">
            Browse sample code for building common use cases on the XRP Ledger
          </h3>
        </div>

        <div className="row col-12  card-deck mt-10" id="code-samples-deck">
          <div className="row col-md-12 px-0" id="code_samples_list">
            {codeSamples.map((card: CodeSample) => {
              return (
                <a
                  className="card cardtest col-12 col-lg-5 {% for lang in card.langs %} lang_{{lang}} {% endfor %} "
                  href={
                    "{target.github_forkurl}/tree/{target.github_branch}/{card.href}"
                  }
                >
                  <div className="card-header">
                    {card.langs.map((lang: string) => {
                      return (
                        <span className="circled-logo">
                          <img src={langIcons[lang]} />
                        </span>
                      );
                    })}
                  </div>
                  <div className="card-body">
                    <h4 className="card-title h5">{card.title}</h4>
                    <p className="card-text">{card.description}</p>
                  </div>
                  <div className="card-footer">&nbsp;</div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section className="container-new py-26">
        <div>
          <div className="d-flex flex-column">
            <h3 className="h4 h2-sm pb-4">Contribute Code Samples</h3>
            <h6 className="eyebrow mb-20">
              Help the XRPL community by submitting your
              <br /> own code samples
            </h6>
          </div>

          <div className="row pl-4">
            <div className=" col-lg-3 pl-4 pl-lg-0 pr-4 contribute  dot contribute_1">
              <span className="dot"></span>
              <h5 className="pb-4 pt-md-5">Fork and clone</h5>
              <p className="pb-4">
                Fork the{" "}
                <a href="{{target.github_forkurl}}">xrpl-dev-portal repo</a>.
                Using git, clone the fork to your computer.
              </p>
            </div>
            <div className=" col-lg-3 pl-4 pl-lg-0 pr-4 contribute  dot contribute_2">
              <span className="dot"></span>
              <h5 className="pb-4 pt-md-5">Add to folder</h5>
              <p className="pb-4">
                Add your sample code to the <code>content/_code-samples/</code>{" "}
                folder. Be sure to include a <code>README.md</code> that
                summarizes what it does and anything else people should know
                about it.
              </p>
            </div>
            <div className=" col-lg-3 pl-4 pl-lg-0 pr-4 contribute  dot contribute_3">
              <span className="dot"></span>
              <h5 className="pb-4 pt-md-5">Commit and push</h5>
              <p className="pb-4">
                Commit your changes and push them to your fork on GitHub.
              </p>
            </div>
            <div className=" col-lg-3 pl-4 pl-lg-0 pr-2 contribute  dot contribute_4 mb-4">
              <span className="dot"></span>
              <h5 className="pb-4 pt-md-5">Open a pull request</h5>
              <p className="pb-0 mb-0">
                Open a pull request to the original repo. Maintainers will
                review your submission and suggest changes if necessary. If the
                code sample is helpful, it’ll be merged and added to XRPL.org!
              </p>
            </div>
          </div>

          <a className="mt-12 btn btn-primary btn-arrow" href="#">
            Submit Code Samples
          </a>
        </div>
      </section>
      <div className="p-2 mt-30">
        <form>
          <p>Code Language</p>
          <div>
            <input
              type="radio"
              name="langs"
              id="input_all"
              value="All"
              checked
            />{" "}
            <label htmlFor="input_all">All</label>
          </div>
          {allLangs.map((lang: string) => {
            return (
              <div className="single_lang">
                <input
                  type="radio"
                  name="langs"
                  id="input_{{lang}}"
                  value="{{lang}}"
                />
                <label htmlFor={"input_" + lang}>{langText[lang]}</label>
              </div>
            );
          })}
        </form>
      </div>
      <br></br>
    </div>
  );
}

{
  /* {% endblock %}
   */
}

{
  /* {% block analytics %}
    <script type="application/javascript">
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      "event": "page_info",
      "page_type": "Hub Page",
      "page_group": "Code Samples"
    })
    </script>
{% endblock analytics %} */
}

{
  /* {% block bottom_left_sidebar %} */
}
{
  /* {% set lang_text = {
      "cli": "CLI",
      "go": "go",
      "java": "Java",
      "js": "JavaScript",
      "py": "Python",
      "http": "HTTP",
    } %} */
}

{
  /* 
// {% block endbody %}
// <script type="application/javascript" src="{{currentpage.prefix}}assets/js/code-samples.js"></script>
// {% endblock %} */
}
