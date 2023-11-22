/* global $ */
// ==UserScript==
// @name         Copy Website Data
// @namespace    http://uat.ois.aplushk.com
// @version      1.0
// @description  Copy website data to clipboard
// @author       Wendy
// @match        http://uat.ois.aplushk.com/file/job/stamper/*?udf_id=undefined
// @grant        GM_setClipboard
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// ==/UserScript==
(function() {
    'use strict';

    var buttonContainer = $("#widget-grid div h2:first");
    var copyButton = $("#widget-grid .special-copy-button");
    if (!copyButton.length) {
        copyButton = $("<button>").addClass("btn btn-primary special-copy-button").css({
            color: "#fff",
            top: "-20px",
            left: "50%",
            position: "relative"
        }).text("copy");
        buttonContainer.append(copyButton);
    }

     // 綁定Copy按鈕的點擊事件
    copyButton.on("click", function() {
        // 獲取要複製的內容
        var today = new Date();
        var year = today.getFullYear();
        var month = today.getMonth() + 1;
        var day = today.getDate();
        var date = month + '/' + day + '/' + year;

        var tr = $("#task_info_tr");
        var task_no = tr.find("td:nth-child(4)").text().trim();
        var job_name = tr.find('td:nth-child(5)').text().trim();
        if (tr.has('> p:nth-child(1)').length) {
            job_name = tr.find('> p:nth-child(1)').text().trim();
        }
        var est_man_min = tr.attr('attr-est_man_min');
        var original_reply_time = tr.attr('attr-request_tat');

        var stamper_tr = $('.fancyTable tbody tr:last');
        var start_time = stamper_tr.find("td:nth-child(11)").text().trim();

        var task_cate = "新排";
        var progress = "首次出稿";
        var type = "Ann";
        var page = "";
        var back_page = "";
        var communicated_reply_time = "";
        var liElement = document.querySelector('#login-user');
        var aElement = liElement.querySelector('a');
        var regex = /\((.*?)\)/;
        var matches = regex.exec(aElement.textContent);
        var allocation = matches[1];

        var copyContent = date + "\t" + task_cate + "\t" + progress + "\t" + task_no + "\t" + job_name + "\t" + type + "\t" + page + "\t" + back_page + "\t" + est_man_min + "\t" + original_reply_time + "\t" + communicated_reply_time + "\t" + allocation + "\t" + start_time;

        // 複製內容到剪貼板
        GM_setClipboard(copyContent);

          // 顯示Copy Success提示信息
        var successMessage = document.createElement("span");
        successMessage.innerHTML = "Copy Success";
        successMessage.classList.add("copy-success");
        successMessage.style.left = "50%";
        successMessage.style.font = "16px";
        successMessage.style.top = "-20px";
        successMessage.style.position = "relative";
        buttonContainer.append(successMessage);

        // 3秒後隱藏Copy Success提示信息
        setTimeout(function() {
            successMessage.style.display = "none";
        }, 3000);
    });
})();
