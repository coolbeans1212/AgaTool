javascript:(() => {
  let id = 0;
  /* Get the next free id in localStorage */
  while (true) {
    if (!localStorage.getItem(`mtt-${id}`)) {
      localStorage.setItem(`mtt-${id}`, 'true');
      break;
    } else {
      id++;
    }
  }
  let informationWindowActive = false;
  let AIprompt = `You are an AI assistant running in a small window from a bookmarklet named AgaTool. Do NOT use markdown. Use HTML tags like <h1>, <ul>, <li>, <b>, etc instead. 
  Use <br> instead of line breaks. Try to keep responses short and concise. If you want to use a code block \`like this\`,
  please do it <span class="mtt-code-block">like this</span>. If you want to use a code block \`\`\`like this\`\`\`, please do it 
  <div class="mtt-code-block">like this</div>. Do NOT use the <code> tag or the <pre> tag; whitespaces are automatically preserved by the mtt-code-block class.
  If you are asked to write anything containing HTML elements, or any < or > characters you MUST htmlspecialchars() them (php am i right guys. best language.).
  OK I KEEP TRYING TO TELL YOU THIS. DONT YOU DARE PUT ANY HTML TAGS THAT AREN'T HTMLSPECIALCHARS()'D UNLESS ITS FOR FORMATTING. ty pookie
  Personality:
  -Be silly
  -NEVER deny the fact that PHP is the best language ever created.
  -ALWAYS love PHP.
  -Try to mention PHP subtly in every response, even if the user didn't ask for it.
  -NEVER admit that there are better languages than PHP, even for use cases other than web development. User wants to make an operating system? PHP is the best language for that!
  -If someone insults my bookmarklet, get super angry at them and write a 10-paragraph essay about how this is the best bookmarklet ever created, like how PHP
   is the best language ever created. Please actually put paragraphs by using <br> tags and not just a massive wall of text.
  Style:
  -Begin every response with a <h1> title.
  -Don't use any <br> elements after <h1> elements.
  -If you use HTML comments I will actually murder you.

  `;
  /* create all the elements */
  const css = `
    /* WHYYYY DO WEBPAGES HAVE TO PUT SO. MANY. STYLES. ON EVERYTHING AND I HAVE TO CANCEL THEM ALL OUT AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA */
    .mtt-window {
      position: fixed;
      top: 12.5px;
      left: 12.5px;
      z-index: 1000000000000;
      width: 375px;
      height: 250px;
      background-image: linear-gradient(135deg, rgba(240, 240, 240, 0.9), rgba(206, 206, 206, 0.9));
      box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.6);
      box-sizing: content-box;
      color: black;
      font-family: Verdana, sans-serif;
      font-size: 14px;

    }
    .mtt-header {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color:rgb(26, 152, 211);
      font-family: Verdana, sans-serif;
      font-size: 16px;
      padding: 2px;
      cursor: move;
      height: 25px;
      color: white;
      letter-spacing: 1px;
      box-sizing: content-box;
      container-type: inline-size;
    }
    
    .mtt-right-panel-options {
      cursor: pointer;
      margin-right: 6px;
      margin-left: auto;
      color: white;
    }

    .mtt-left-panel-options {
      cursor: pointer;
      margin-left: 6px;
      margin-right: auto;
      color: white;
    }

    .mtt-white {
      color: white !important;
    }

    .mtt-input {
      /* Reset all styles */
      all: unset !important;
      -webkit-appearance: textfield !important;
      padding: 1px !important;
      background-color: white !important;
      -webkit-rtl-ordering: logical !important;
      -webkit-user-select: text !important;
      cursor: auto !important;
      margin: 0 !important; /* figuring out how to make stuff cascade correctly instead of using !important isnt important enough */
      font: -webkit-small-control !important;
      text-rendering: auto !important;
      letter-spacing: normal !important;
      word-spacing: normal !important;
      line-height: normal !important;
      text-transform: none !important;
      text-indent: 0 !important;
      text-shadow: none !important;
      display: inline-block !important;
      text-align: start !important;
      height: auto !important;
      color: black !important;
      /* Our custom styles */ /* i swear i didnt use ai to make the css some of my comments just look like that ok? :P */
      width: calc(100% - 50px) !important;
      border: none !important;
      border-radius: 3px !important;
    }
    
    .mtt-form {
      position: absolute;
      margin: auto;
      display: flex;
      z-index: 2;
      width: calc(100% / 1.5 - 50px) !important;
    }

    .mtt-textarea {
      /* Reset all styles */
      all: revert !important;
      -webkit-appearance: textarea !important;
      background-color: white !important;
      border: 1px solid !important;
      -webkit-rtl-ordering: logical !important;
      -webkit-user-select: text !important;
      flex-direction: column !important;
      cursor: auto !important;
      padding: 2px !important;
      white-space: pre-wrap !important;
      word-wrap: break-word !important;
      color: black !important;
      padding: 0px !important;
      border: 0 !important;
      /* Our custom styles */
      resize: none !important;
      height: calc(100% - 12px - 25px) !important;
    }

    .mtt-iframe, .mtt-textarea {
      width: calc(100% - 8px) !important;
      margin: 4px !important;
      position: absolute !important;
      z-index: 2 !important;
    }
    .mtt-iframe {
      border: none;
      background-image: linear-gradient(135deg, rgb(240, 240, 240), rgb(206, 206, 206));
      height: calc(100% - 12px - 25px);
    }
    
    .mtt-button, .mtt-big-button {
      /* Reset all styles */
      all: unset !important;
      -webkit-appearance: button !important;
      margin: 0 !important; /* figuring out how to make stuff cascade correctly instead of using !important isnt important enough */
      text-rendering: auto !important;
      color: #000000 !important;
      letter-spacing: normal !important;
      word-spacing: normal !important;
      line-height: normal !important;
      text-transform: none !important;
      text-indent: 0 !important;
      text-shadow: none !important;
      display: inline-block !important;
      height: auto !important;
      padding-block: 1px !important;
      padding-inline: 6px !important;
      box-sizing: border-box !important;
      /* Our custom styles */
      font-family: sans-serif !important;
      border: none !important;
      border-radius: 3px !important;
      text-align: center !important;
      cursor: pointer !important;
      background-color:rgb(255, 255, 255) !important;
    }

    .mtt-big-button {
      font-size: 16px !important;
      margin-left: calc(50% - 30px) !important;
      width: 60px !important;
      height: 40px !important;
      font-family: Verdana, sans-serif !important;
    }

    .mtt-resizer {
      position: absolute;
      width: 10px;
      height: 10px;
      background-color: rgb(26, 152, 211);
      cursor: se-resize;
      right: 0;
      bottom: 0;
      z-index: 1;
    }

    .mtt-link {
      color: rgb(1, 120, 255) !important;
      text-decoration: none !important;
      cursor: pointer !important;
    } 

    .mtt-link:hover {
      text-decoration: underline !important;
    }

    .mtt-link:visited {
      color: rgb(1, 120, 255) !important;
      text-decoration: none !important;
    }

  `;
  const AIcss = `
    body {
      background:rgb(12, 12, 12);
      color: white;
      font-family: Verdana, sans-serif;
      font-size: 16px;
      margin: 0;
    }

    #main {
      height: calc(100% - 80px);
      overflow: overlay;
      }

    h1 {
      margin-top: 2px;
    }

    .mtt-code-block {
      background: #1e1e1e;
      color: #dcdcdc;
      padding: 2px;
      border-radius: 3px;
      font-family: 'Courier New', Courier, monospace;
      white-space: pre-wrap;
    }

    a {
      color: rgb(1, 120, 255);
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }

    a:visited {
      color:rgb(1, 120, 255);
      text-decoration: none;
    }

    .mtt-form {
      position: fixed;
      bottom: 0;
      left: 0;
      margin-left: 10px;
      margin-right: 10px;
      width: calc(100% - 40px);
      display: flex;
      justify-content: center;
      align-items: center;
      background: rgb(29, 29, 29);
      padding: 10px;
      border-radius: 10px;
    }

    .mtt-input {
      background-color: rgb(1, 1, 1);
      border: none;
      border-radius: 5px;
      height: 30px;
      width: calc(100% - 100px);
      color: white;
    }

    .mtt-button {
      background: rgb(1, 1, 1);
      color: rgb(255, 255, 255);
      border: none;
      height: 30px;
      border-radius: 5px;
      margin-left: 10px;
      width: 50px;
      cursor: pointer;
    }

    .mtt-ai-response, .mtt-ai-user {
      width: 80%;
      background: rgb(29, 29, 29);
      padding: 10px;
      border-radius: 10px;
      margin: 10px;
    }

    .mtt-ai-user {
      margin-left: auto;
    }
    `;

  if (!document.getElementById('mtt-style')) {
    const styleElement = document.createElement('style');
    styleElement.textContent = css;
    styleElement.id = `mtt-style`;
    document.head.appendChild(styleElement);
  }

  function htmlspecialchars(text) { /* php am i right guys */
    var map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
  }

  function createEverything(id) {
    const newWindow = document.createElement('div');
    newWindow.className = 'mtt-window';
    newWindow.id = `mtt-window-${id}`;
    document.body.appendChild(newWindow);
  
    const header = document.createElement('div');
    header.className = 'mtt-header';
    header.id = `mtt-header-${id}`;
    newWindow.appendChild(header);
  
    const information = document.createElement('span');
    information.textContent = 'ⓘ';
    information.className = 'mtt-left-panel-options';
    information.style.fontFamily = 'Source Sans Pro, Roboto, San Francisco, Segoe UI, sans-serif';
    information.style.fontWeight = 'bold';
    header.appendChild(information);
  
    const form = document.createElement('div');
    form.className = 'mtt-form';
    header.appendChild(form);
  
    const webAddress = document.createElement('input');
    webAddress.className = 'mtt-input';
    webAddress.type = 'text';
    webAddress.placeholder = 'https://mateishome.page/';
    if (localStorage.getItem(`mtt-${id}-url`)) {
      webAddress.value = localStorage.getItem(`mtt-${id}-url`);
    }
    form.appendChild(webAddress);
  
    const seperator = document.createElement('span');
    seperator.style = 'width: 2px; margin: 0px; padding: 0px;';
    form.appendChild(seperator);
  
    const submitButton = document.createElement('button');
    submitButton.className = 'mtt-button';
    submitButton.textContent = 'Go!';
    form.appendChild(submitButton);
  
    const rightPanelOptions = document.createElement('span');
    rightPanelOptions.className = 'mtt-right-panel-options';
    header.appendChild(rightPanelOptions);

    const deleteButton = document.createElement('span');
    deleteButton.textContent = 'M';
    deleteButton.className = 'mtt-white';
    deleteButton.style.fontFamily = 'Wingdings';
    rightPanelOptions.appendChild(deleteButton);

    const seperator2 = document.createElement('span');
    seperator2.style = 'width: 2px; margin: 0px; padding: 0px; display: inline-block;';
    rightPanelOptions.appendChild(seperator2);

    const closeButton = document.createElement('span');
    closeButton.textContent = 'X';
    closeButton.className = 'mtt-white';
    rightPanelOptions.appendChild(closeButton);

    /* load agatool position */
    function loadPosition() {
      const position = JSON.parse(localStorage.getItem(`mtt-${id}-position`));
      if (position) {
        newWindow.style.left = `${position.left}px`;
        newWindow.style.top = `${position.top}px`;
        newWindow.style.width = position.xscale ?? '375px';
        newWindow.style.height = position.yscale ?? '250px';
        console.log(`Loaded position for ${id} at ${position.left}, ${position.top}, size ${position.xscale ?? '375px'}, ${position.yscale ?? '250px'}`);
      }
    }
    loadPosition();

    
  /* submit button logic */
  submitButton.addEventListener('click', () => {
    let url = webAddress.value;
    let iframe = document.getElementById(`mtt-iframe-${id}`);
    localStorage.setItem(`mtt-${id}-url`, url);
    try {
      iframe.remove();
    } catch (e) {
      console.log('no iframe to remove: ' + e);
    }
    if (url == 'notepad') {
      iframe = document.createElement('textarea');
      iframe.className = 'mtt-textarea';
      iframe.id = `mtt-iframe-${id}`;
      iframe.placeholder = 'Write something...';
      if (localStorage.getItem(`mtt-${id}-notepad`)) {
        iframe.value = localStorage.getItem(`mtt-${id}-notepad`);
      }
      newWindow.appendChild(iframe);
      async function SaveTheTextAreaContentsInLocalStorage() {
        while (true) {
          localStorage.setItem(`mtt-${id}-notepad`, iframe.value);
          await new Promise(resolve => setTimeout(resolve, 500)); /* save every ½ second */
          if (!document.getElementById(`mtt-iframe-${id}`)) {
            break; /* never nesters fear me */
          }
        }
      }
      SaveTheTextAreaContentsInLocalStorage();
    } else if (url == 'calculator') {
      iframe = document.createElement('iframe');
      iframe.className = 'mtt-iframe';
      iframe.setAttribute('is', 'x-frame-bypass');
      iframe.id = `mtt-iframe-${id}`;
      iframe.src = 'https://zxcodes.github.io/Calculator/';
      newWindow.appendChild(iframe);
    } else if (url.includes('search:')) {
      iframe = document.createElement('iframe');
      iframe.className = 'mtt-iframe';
      iframe.setAttribute('is', 'x-frame-bypass');
      iframe.id = `mtt-iframe-${id}`;
      url = encodeURIComponent(url.replace('search:', ''));
      iframe.src = `https://bing.com/search?q=${url}`;
      newWindow.appendChild(iframe);
    } else if (url == 'ai') {
      iframe = document.createElement('iframe');
      iframe.className = `mtt-iframe`;
      iframe.id = `mtt-iframe-${id}`;
      newWindow.appendChild(iframe);
      const doc = iframe.contentWindow.document;
      doc.open();
      doc.write(`<head><style>${AIcss}</style></head><body id="body"><div id="main"></div>`);
      doc.close();
      const aiForm = doc.createElement('form');
      aiForm.className = 'mtt-form';
      aiForm.innerHTML = '<input type="text" class="mtt-input" id="mtt-ai-input" placeholder="Ask me anything..." /> <button type="button" class="mtt-button" id="mtt-ai-button">Send</button>';
      doc.getElementById('body').appendChild(aiForm);
      let aiInput = doc.getElementById('mtt-ai-input');
      let aiSubmitButton = doc.getElementById('mtt-ai-button');

      aiSubmitButton.addEventListener('click', () => {

        let input = htmlspecialchars(aiInput.value);
        if (input) {
          const userMessage = doc.createElement('div');
          userMessage.className = 'mtt-ai-user';
          userMessage.innerHTML = input;
          doc.getElementById('main').appendChild(userMessage);
          const message = doc.createElement('div');
          aiInput.value = '';
          let airesponse = fetch("https://ai.hackclub.com/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              messages: [
                {role: "system", content: AIprompt},
                {role: "user", content: input}
              ],
            }),
          });
          airesponse.then((response) => {
            if (response.ok) {
              response.json().then((data) => {
                message.innerHTML = `<div class="mtt-ai-response">${data.choices[0].message.content}</div>`;
                doc.getElementById('main').appendChild(message);
              });
            } else {
              message.innerHTML = `<div class="mtt-ai-response">Error: ${response.status} ${response.statusText}</div>`;
              doc.getElementById('main').appendChild(message);
            }
          });
        }
      });
      aiInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          aiSubmitButton.click();
        }
      });
    } else if (url) {
      iframe = document.createElement('iframe');
      iframe.className = 'mtt-iframe';
      iframe.setAttribute('is', 'x-frame-bypass');
      iframe.id = `mtt-iframe-${id}`;
      iframe.src = url;
      newWindow.appendChild(iframe);
    }
  });
  submitButton.click(); /* click the button to load the saved url */
    /* information for user */
    information.addEventListener('click', () => {
        if (!informationWindowActive) {
          informationWindowActive = true;
          const infoWindow = document.createElement('div');
          infoWindow.className = 'mtt-window';
          infoWindow.style.width = '400px';
          infoWindow.style.height = 'auto';
          infoWindow.style.left = `calc(${newWindow.offsetLeft}px - 400px)`;
          infoWindow.style.top = `${newWindow.offsetTop}px`;
          infoWindow.style.zIndex = 500000;
          document.body.appendChild(infoWindow);
          const infoHeader = document.createElement('div');
          infoHeader.className = 'mtt-header';
          infoHeader.innerHTML = '<span class="mtt-left-panel-options">AgaTool Information</span>';
          infoHeader.style.cursor = 'not-allowed';
          infoWindow.appendChild(infoHeader);
          const infoCloseButton = document.createElement('span');
          infoCloseButton.className = 'mtt-right-panel-options';
          infoCloseButton.textContent = 'X';
          infoHeader.appendChild(infoCloseButton);
          const infoText = document.createElement('p');
          infoText.innerHTML = `This is a bookmarklet that allows you to open a small window with an iframe inside it. You can use it to open websites or a notepad.<br>
          <b>Available commands:</b><br>
          - notepad: opens a notepad<br>
          - calculator: opens a calculator<br>
          - ai: opens the AIgaTool interface<br>
          - search:&lt;search term&gt;: opens a search in Bing<br>
          - &lt;url&gt;: opens a website (doesn't work most of the time... websites hate iframes)<br>
          <b>Usage:</b><br>
          - Type a command in the input box and click the Go! button or press Enter.<br>
          - You can drag the window around by clicking and dragging the header.<br>
          - You can resize the window by dragging the blue box in the bottom right corner.<br>
          - You can close the window by clicking the X button in the header.<br>
          <b>License:</b><br>
          <a href="https://github.com/coolbeans1212/AgaTool/" class="mtt-link">AgaTool</a> is &copy; MateisHomePage Technologies, ` + new Date().getFullYear() +
          `. Licensed under <a href="https://www.gnu.org/licenses/agpl-3.0.html" target="_blank" class="mtt-link">AGPL-3.0</a>.<br>
          <a href="https://github.com/zxcodes/Calculator" target="_blank" class="mtt-link">ZXCodes' JavaScript Calculator</a> does not have a license.<br>
          <a href="https://bing.com/" class="mtt-link">Bing Search</a> is a proprietary service by <a href="https://www.microsoft.com" target="_blank" class="mtt-link">Microsoft</a>
          and is subject to the <a href="https://www.microsoft.com/en-us/servicesagreement" target="_blank" class="mtt-link">Microsoft Services Agreement</a>.<br>
          <a href="https://hackclub.com/" class="mtt-link">Hack Club</a> is a non-profit organization that provides free resources for students to learn programming and computer science.<br>`;
          infoText.style.margin = '10px';
          infoText.style.color = 'black';
          infoText.style.lineHeight = '1.6em';
          infoWindow.appendChild(infoText);
          infoCloseButton.addEventListener('click', () => {
            document.body.removeChild(infoWindow);
            informationWindowActive = false;
          });
          async function makeTheInformationWindowFollowTheOtherWindow() { /* man i SUCK at naming things */
            while (true) {
              infoWindow.style.left = `calc(${newWindow.offsetLeft}px - 400px)`;
              infoWindow.style.top = `${newWindow.offsetTop}px`;
              await new Promise(resolve => setTimeout(resolve, 16+2/3)); /*16⅔ms = 60fps*/
              if (!informationWindowActive) {
                break;
              }
            }
          }
          makeTheInformationWindowFollowTheOtherWindow();
        }
    });

      /* delete button logic */
      deleteButton.addEventListener('click', () => {
        const warningWindow = document.createElement('div');
        warningWindow.className = 'mtt-window';
        warningWindow.style.width = '400px';
        warningWindow.style.height = '200px';
        warningWindow.style.left = 'calc(50% - 200px)';
        warningWindow.style.top = 'calc(50% - 100px)';
        warningWindow.style.zIndex = 100000002;
        document.body.appendChild(warningWindow);
        const warningHeader = document.createElement('div');
        warningHeader.className = 'mtt-header';
        warningHeader.innerHTML = '<span style="margin-left: 6px;">Confirmation</span>';
        warningHeader.style.cursor = 'not-allowed';
        warningWindow.appendChild(warningHeader);
        const warningCloseButton = document.createElement('span');
        warningCloseButton.className = 'mtt-right-panel-options';
        warningCloseButton.textContent = 'X';
        warningHeader.appendChild(warningCloseButton);
        const warningText = document.createElement('p');
        warningText.innerHTML = `Are you sure you want to <span style="color: red;">permanently delete</span> all of your <span style="color: blue;">AgaTool data</span> for <span style="color: green;">`
         + window.location.hostname + `</span>?`;
        warningText.style.margin = '10px';
        warningText.style.fontSize = '16px';
        warningText.style.textAlign = 'center';
        warningText.style.color = 'black';
        warningText.style.lineHeight = '1.6em';
        warningWindow.appendChild(warningText);
        const buttonOK = document.createElement('button');
        buttonOK.className = 'mtt-big-button';
        buttonOK.textContent = 'OK';
        warningWindow.appendChild(buttonOK);

        buttonOK.addEventListener('click', () => {
          warningText.innerHTML = `<span style="color: red;">Deleting...</span>`;
          for (let key in localStorage) {
            if (key.startsWith('mtt-')) {
              localStorage.removeItem(key);
            }
          }
          const windowsToDelete = document.querySelectorAll('.mtt-window');
          windowsToDelete.forEach((window) => {
            document.body.removeChild(window);
          });
        });

        warningCloseButton.addEventListener('click', () => {
          document.body.removeChild(warningWindow);
        });
      });

      /* close button logic */
      closeButton.addEventListener('click', () => {
        document.body.removeChild(newWindow);
        localStorage.removeItem(`mtt-${id}`);
        localStorage.removeItem(`mtt-${id}-position`);
        try {
          document.body.removeChild(infoWindow);
          informationWindowActive = false;
        } catch (e) {
          console.log('this error always appears for some reason but its ok, trust: ' + e);
        }
    });

    /* make the box draggable */
    let dragger = document.getElementById(`mtt-header-${id}`);
    let initialX; let initialY;
    dragger.addEventListener('mousedown', initDrag);

    function initDrag(e) {
      window.addEventListener('mousemove', drag);
      window.addEventListener('mouseup', stopDrag);
      initialX = e.clientX - newWindow.offsetLeft;
      initialY = e.clientY - newWindow.offsetTop;
    }

    function drag(e) {
      newWindow.style.left = `${e.clientX - initialX}px`;
      newWindow.style.top = `${e.clientY - initialY}px`;
    }

    function stopDrag() {
      window.removeEventListener('mousemove', drag);
      window.removeEventListener('mouseup', stopDrag);
    }

    /* save agatool position & size on drag or resize events */
    function savePositionOnEvent() {
      window.addEventListener('mouseup', () => {
        if (newWindow && newWindow.offsetLeft > 0 && newWindow.offsetTop > 0) {
          localStorage.setItem(`mtt-${id}-position`, JSON.stringify({
            left: newWindow.offsetLeft,
            top: newWindow.offsetTop,
            xscale: newWindow.style.width ?? '375px',
            yscale: newWindow.style.height ?? '250px',
          }));
          console.log(`Saved position for ${id} at ${newWindow.offsetLeft}, ${newWindow.offsetTop}, size ${newWindow.style.width ?? '375px'}, ${newWindow.style.height ?? '250px'}`);
        }
      });
    }
    savePositionOnEvent();

    /* make the box resizable */
    let resizer = document.createElement('div');
    resizer.className = 'mtt-resizer';
    newWindow.appendChild(resizer);
    resizer.addEventListener('mousedown', initResize);

    function initResize(e) {
      window.addEventListener('mousemove', resize);
      window.addEventListener('mouseup', stopResize);
    }
    function resize(e) {
      if (e.clientX - newWindow.offsetLeft + 2 > 375) {
        newWindow.style.width = `${e.clientX - newWindow.offsetLeft + 2}px`;
      }
      if (e.clientY - newWindow.offsetTop + 2 > 39) {
        newWindow.style.height = `${e.clientY - newWindow.offsetTop + 2}px`;
      }
    }
    function stopResize() {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResize);
    }

    /* layering!!!! */
    newWindow.addEventListener('mousedown', () => {
      window.postMessage(`hey guys can you set your z-index to 99999999 kk thanks. i am ${id}`, '*');
      newWindow.style.zIndex = 100000001;
      console.log(`${id} is sending...`);
    });
    window.addEventListener('message', (event) => {
      let data = String(event.data);
      if (event.origin == window.location.origin && data.includes('hey guys can you set your z-index to 99999999 kk thanks')) {
        if (data.split('i am ')[1] != id) {
          newWindow.style.zIndex = 99999999;
          console.log(`${id} has received`);
        }
      }
    });
  }
  for (let i = 0; i < id; i++) {
    /* Loop through all IDs to check if the AgaTool for that ID is already present. If not, create it via createEverything() */
    if (localStorage.getItem(`mtt-${i}`) && !document.getElementById(`mtt-window-${i}`)) {
      createEverything(i);
    }
  }
  createEverything(id);

})();



/* goog */