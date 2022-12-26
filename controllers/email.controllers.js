var nodemailer = require('nodemailer');

const smtpConfig = {
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: "quatrellothebridge@gmail.com",
    pass: "kvygzxqgdachkjoe"
  }
};
const transporter = nodemailer.createTransport(smtpConfig);

const email = {
  /**
   * Envia un email al usuario que desea registrarse para verificar que el email realmente pertenece al usuario.
   * @param {STRING} jwt JSON web token generado para insertar en la url del enlace de verificación.
   * @param {STRING} email email del usuario.
   */
  emailToRegister: async (jwt, email) => {
    var username = email.split("@")[0]
    console.log("eviando correo")
    var mailOptions = {
      from: 'pww@gmail.com',
      to: email,
      subject: 'Verifica tu correo electrónico para PicturesWorldWide',
      text: "",
      html: `<!doctype html>
            <html ⚡4email>
              <head>
                <meta charset="utf-8">
              </head>
              <body>
                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-collapse:collapse">
                  <tbody>
                    <tr>
                     <td align="center">
                      <div style="max-width:520px;margin:0 auto">
                          <div
                              style="vertical-align:top;text-align:left;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;font-size:14px;font-weight:400;letter-spacing:-0.005em;color:#091e42;line-height:40px">
                              <div style="padding-top:30px;padding-bottom:20px;vertical-align:top;text-align:center"><img
                                          src="https://lh3.googleusercontent.com/fife/AAbDypArJ-aV5se_A23aV_kFK_yWjcDo7hSFx_BE1rPa4VdvlFBVVMlcVLlE7lChtVgb2Zys7AyOngCx39S2CmxZiZ_b8jN_cx2YRPlrZaJSOr6yHMpkpdSR9cz8yBObZ1ohXrwdS50uiBn7feSoL7_-8ngg-EKZqfxkugdrUJKLYXXi4jFbVoTPUqqFEFCt5Vc0itk7FhHCMNwGolQ5Q60HzZAVgWduZJS-dw0TWPZjAhXGVpmDHT78SVEn6wvUz_E4snyxF39Ys1x_ApoLlamKasy-aIbYoxfRS67k0Dg0Vkqfeblc-B7uxzKkar6ROdvG53ZLTyQ1SURVRWTT1b7mEsdTGANwhesu_Nw0VNtro7hQT3TB1Voz1b_YUKO2Dq0Z1dQ4KpuBCNwpx8aas0dPCckNWrKU0TYyE2Swys3u8VYyt60735c2koVw_z5An686NtQUUGxASVNQhemFKlHgScpipn3GUTpp4p6mRGkkF3CCWEgfQtKqQcrLct7sMYfIWxIEmlTkkTjVeEIjSSYHmef99QpS3DwDhPQZuvuWjncYdMmBkNHdR9ttp1-SZCtasG5nF9muwIFkQFWNZPffivUXwU8h_hNMvlX4P0skFmpQh_dyNuzoMByt-8ddalor9FNpyMSO95Y9SeVSIfOT-XujdMa58z1Q6J6uxwjxrbjXRX4Kj8MM7SoPSOPTMOdIBxeG_taEEhak1yChAF8qvxd3RkqWCBHGm1TqmKuuYOkdiHgzmE_ZxPEPtlqN08JrBTISe8BqsN1Gr1amLiC2N4khOJ1k4TvpTgIaJ_qycc_Q90NsPZTjVstr6A7QBZiU1SKZXfx9RKO7a4uRqBBhU2LlF4aMFwRLl5hdAM6LVHeTMJIJ16tOjnczjUO6WcplsQTkdVBFvS5e4H90mvMbXRmw83dS6lyEFce1S7itx82UrrXCOvAprSduzZDTWESHLHmZlLTQrn3r5_lHyRMOMEq_AezYrFGGEY7RJ9bULuQ5Rml-RWRsKP_lqCgKZ1_B1QlKUNQ_lRa51wSo7JshSR4HOBxZMgpP8npFtIgRFvij0_REzTubR4FGoWNk7bQCEBLKq3KpBGUOUukL2w7vMbnyH_QmvhpsBHV29BObH40u6bnDbb3BX_YhchYPdgYYLHCp5elGEamTneTtfp_y_EUOGLLImQfuW6YR0eqAv7ot-NpvMAXlFt5gObxrjfWXrGTLqiG1donhjPf4cjFL95s9TVBGfuMeYJ2I-tDVmZkAsvF-vZWiZ4NRVmpN-ENrNQkE4po4AlSaP-oJZaChq142823x6BHJhAc_w211vsGLEvJSx7fe0pvZDPYvP2iXyLn2PYHQBw8Saga6nho5IIrg8EieqQ0LInG9x8l5jU9nbfaWrXW8kK8g-I7tnWBxrIj_N3ZG1zQ-F_TR9xZUHQm5_6oVijw6o3WBVKg0UCDRpvZV95qldocBDcNbZLi5gMlJ-RVLCKzfgTCh_fFhAdNLDtTmzB8SpN_qGjxH67wIuWBalnNiYbNfyNTl7g_9AXJlZuLXN7Czupo38ddKYtBeWeS_V7dRFX5rEFp43jc5Q_79uqRk6QnrSurtVc2LVg=w1920-h902"
                                          height="60" alt="quatrellothebridge"
                                          style="line-height:100%;outline:none;text-decoration:none;border:0" class="CToWUd"
                                          data-bit="iit"></a></div>
                              <hr style="margin-top:24px;margin-bottom:24px;border:0;border-bottom:1px solid #c1c7d0">
                              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-collapse:collapse">
                                  <tbody>
                                      <tr>
                                          <td align="center"><img
                                                  src="https://www.iai.co.il/drupal/sites/default/files/2022-02/IAI%20Worldwide.jpg"
                                                  height="142" border="0" alt=""
                                                  style="border:0;line-height:100%;outline:none;text-decoration:none"
                                                  class="CToWUd a6T" data-bit="iit" tabindex="0">
                                          </td>
                                      </tr>
                                  </tbody>
                              </table>
                              <h1
                                  style="margin-bottom:0;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;font-size:24px;font-weight:500;letter-spacing:-0.01em;color:#172b4d;line-height:28px;margin-top:40px">
                                  ¡Ya falta poco!</h1>
                              <p
                                  style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;font-size:14px;font-weight:400;letter-spacing:-0.005em;color:#091e42;line-height:20px;margin-top:12px">
                                  <a style="text-decoration:none;color:inherit">Hola, ${username}:</a></p>
                              <p
                                  style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;font-size:14px;font-weight:400;letter-spacing:-0.005em;color:#091e42;line-height:20px;margin-top:12px">
                                  Para terminar de configurar tu cuenta y empezar a usar Pictures World Wide, confirma que
                                  tenemos tu correo electrónico correcto.</p>
                              <div style="margin-top:28px"><a
                                      href="http://127.0.0.1:3000/account-verify/${jwt}"
                                      style="box-sizing:border-box;border-radius:3px;border-width:0;border:none;display:inline-flex;font-style:normal;font-size:inherit;height:2.28571429em;line-height:2.28571429em;margin:0;outline:none;padding:0 12px;text-align:center;vertical-align:middle;white-space:nowrap;text-decoration:none;background:#0052cc;color:#ffffff"
                                      target="_blank"
                                      >Verifica tu correo electrónico</a></div>
                              <hr style="margin-top:24px;margin-bottom:24px;border:0;border-bottom:1px solid #c1c7d0">
                                      <tbody>
                                          <tr>
                                              <td valign="top" align="center"
                                                  style="padding-top:10px;line-height:18px;text-align:center;font-weight:none;font-size:12px;color:#505f79">
                                                  <span>Has recibido este mensaje de parte de PicturesWorldWide</span><br></td>
                                          </tr>
                                          <tr valign="top">
                                              <td align="center" style="padding-top:15px;padding-bottom:30px"><img
                                                          src="https://lh3.googleusercontent.com/fife/AAbDypArJ-aV5se_A23aV_kFK_yWjcDo7hSFx_BE1rPa4VdvlFBVVMlcVLlE7lChtVgb2Zys7AyOngCx39S2CmxZiZ_b8jN_cx2YRPlrZaJSOr6yHMpkpdSR9cz8yBObZ1ohXrwdS50uiBn7feSoL7_-8ngg-EKZqfxkugdrUJKLYXXi4jFbVoTPUqqFEFCt5Vc0itk7FhHCMNwGolQ5Q60HzZAVgWduZJS-dw0TWPZjAhXGVpmDHT78SVEn6wvUz_E4snyxF39Ys1x_ApoLlamKasy-aIbYoxfRS67k0Dg0Vkqfeblc-B7uxzKkar6ROdvG53ZLTyQ1SURVRWTT1b7mEsdTGANwhesu_Nw0VNtro7hQT3TB1Voz1b_YUKO2Dq0Z1dQ4KpuBCNwpx8aas0dPCckNWrKU0TYyE2Swys3u8VYyt60735c2koVw_z5An686NtQUUGxASVNQhemFKlHgScpipn3GUTpp4p6mRGkkF3CCWEgfQtKqQcrLct7sMYfIWxIEmlTkkTjVeEIjSSYHmef99QpS3DwDhPQZuvuWjncYdMmBkNHdR9ttp1-SZCtasG5nF9muwIFkQFWNZPffivUXwU8h_hNMvlX4P0skFmpQh_dyNuzoMByt-8ddalor9FNpyMSO95Y9SeVSIfOT-XujdMa58z1Q6J6uxwjxrbjXRX4Kj8MM7SoPSOPTMOdIBxeG_taEEhak1yChAF8qvxd3RkqWCBHGm1TqmKuuYOkdiHgzmE_ZxPEPtlqN08JrBTISe8BqsN1Gr1amLiC2N4khOJ1k4TvpTgIaJ_qycc_Q90NsPZTjVstr6A7QBZiU1SKZXfx9RKO7a4uRqBBhU2LlF4aMFwRLl5hdAM6LVHeTMJIJ16tOjnczjUO6WcplsQTkdVBFvS5e4H90mvMbXRmw83dS6lyEFce1S7itx82UrrXCOvAprSduzZDTWESHLHmZlLTQrn3r5_lHyRMOMEq_AezYrFGGEY7RJ9bULuQ5Rml-RWRsKP_lqCgKZ1_B1QlKUNQ_lRa51wSo7JshSR4HOBxZMgpP8npFtIgRFvij0_REzTubR4FGoWNk7bQCEBLKq3KpBGUOUukL2w7vMbnyH_QmvhpsBHV29BObH40u6bnDbb3BX_YhchYPdgYYLHCp5elGEamTneTtfp_y_EUOGLLImQfuW6YR0eqAv7ot-NpvMAXlFt5gObxrjfWXrGTLqiG1donhjPf4cjFL95s9TVBGfuMeYJ2I-tDVmZkAsvF-vZWiZ4NRVmpN-ENrNQkE4po4AlSaP-oJZaChq142823x6BHJhAc_w211vsGLEvJSx7fe0pvZDPYvP2iXyLn2PYHQBw8Saga6nho5IIrg8EieqQ0LInG9x8l5jU9nbfaWrXW8kK8g-I7tnWBxrIj_N3ZG1zQ-F_TR9xZUHQm5_6oVijw6o3WBVKg0UCDRpvZV95qldocBDcNbZLi5gMlJ-RVLCKzfgTCh_fFhAdNLDtTmzB8SpN_qGjxH67wIuWBalnNiYbNfyNTl7g_9AXJlZuLXN7Czupo38ddKYtBeWeS_V7dRFX5rEFp43jc5Q_79uqRk6QnrSurtVc2LVg=w1920-h902"
                                                          width="114" border="0" alt="quaTrello"
                                                          style="border:0;line-height:100%;outline:none;text-decoration:none;display:block;color:#4c9ac9"
                                                          class="CToWUd" data-bit="iit"></td>
                                          </tr>
                                      </tbody>
                                  </table>
                              </div>
                          </div>
                      </div>
                  </td>
              </tr>
          </tbody>
      </table>
              </body>
            </html>`
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email enviado: ' + info.response);
        console.log(info.accepted)
      }
    });
  },

  /**
   * Envia un correo electrónico con el enlace de recuperación de contraseña
   * @param {string} infoJwt - json web token generado con el email del usuario
   * @param {string} user_email - dirección de email del usuario que ha solicitado la contraseña.
   */
  passrequest: async (infoJwt, user_email) => {

    var mailOptions = {
      from: 'pww@gmail.com',
      to: user_email,
      subject: 'Cambio de contraseña: Comprobacion de identidad',
      text: "",
      html: `<!doctype html>
      <html ⚡4email>
        <head>
          <meta charset="utf-8">
        </head>
        <body>
          <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-collapse:collapse">
            <tbody>
              <tr>
               <td align="center">
                <div style="max-width:520px;margin:0 auto">
                    <div
                        style="vertical-align:top;text-align:left;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;font-size:14px;font-weight:400;letter-spacing:-0.005em;color:#091e42;line-height:40px">
                        <div style="padding-top:30px;padding-bottom:20px;vertical-align:top;text-align:center"><img
                                    src="https://lh3.googleusercontent.com/fife/AAbDypArJ-aV5se_A23aV_kFK_yWjcDo7hSFx_BE1rPa4VdvlFBVVMlcVLlE7lChtVgb2Zys7AyOngCx39S2CmxZiZ_b8jN_cx2YRPlrZaJSOr6yHMpkpdSR9cz8yBObZ1ohXrwdS50uiBn7feSoL7_-8ngg-EKZqfxkugdrUJKLYXXi4jFbVoTPUqqFEFCt5Vc0itk7FhHCMNwGolQ5Q60HzZAVgWduZJS-dw0TWPZjAhXGVpmDHT78SVEn6wvUz_E4snyxF39Ys1x_ApoLlamKasy-aIbYoxfRS67k0Dg0Vkqfeblc-B7uxzKkar6ROdvG53ZLTyQ1SURVRWTT1b7mEsdTGANwhesu_Nw0VNtro7hQT3TB1Voz1b_YUKO2Dq0Z1dQ4KpuBCNwpx8aas0dPCckNWrKU0TYyE2Swys3u8VYyt60735c2koVw_z5An686NtQUUGxASVNQhemFKlHgScpipn3GUTpp4p6mRGkkF3CCWEgfQtKqQcrLct7sMYfIWxIEmlTkkTjVeEIjSSYHmef99QpS3DwDhPQZuvuWjncYdMmBkNHdR9ttp1-SZCtasG5nF9muwIFkQFWNZPffivUXwU8h_hNMvlX4P0skFmpQh_dyNuzoMByt-8ddalor9FNpyMSO95Y9SeVSIfOT-XujdMa58z1Q6J6uxwjxrbjXRX4Kj8MM7SoPSOPTMOdIBxeG_taEEhak1yChAF8qvxd3RkqWCBHGm1TqmKuuYOkdiHgzmE_ZxPEPtlqN08JrBTISe8BqsN1Gr1amLiC2N4khOJ1k4TvpTgIaJ_qycc_Q90NsPZTjVstr6A7QBZiU1SKZXfx9RKO7a4uRqBBhU2LlF4aMFwRLl5hdAM6LVHeTMJIJ16tOjnczjUO6WcplsQTkdVBFvS5e4H90mvMbXRmw83dS6lyEFce1S7itx82UrrXCOvAprSduzZDTWESHLHmZlLTQrn3r5_lHyRMOMEq_AezYrFGGEY7RJ9bULuQ5Rml-RWRsKP_lqCgKZ1_B1QlKUNQ_lRa51wSo7JshSR4HOBxZMgpP8npFtIgRFvij0_REzTubR4FGoWNk7bQCEBLKq3KpBGUOUukL2w7vMbnyH_QmvhpsBHV29BObH40u6bnDbb3BX_YhchYPdgYYLHCp5elGEamTneTtfp_y_EUOGLLImQfuW6YR0eqAv7ot-NpvMAXlFt5gObxrjfWXrGTLqiG1donhjPf4cjFL95s9TVBGfuMeYJ2I-tDVmZkAsvF-vZWiZ4NRVmpN-ENrNQkE4po4AlSaP-oJZaChq142823x6BHJhAc_w211vsGLEvJSx7fe0pvZDPYvP2iXyLn2PYHQBw8Saga6nho5IIrg8EieqQ0LInG9x8l5jU9nbfaWrXW8kK8g-I7tnWBxrIj_N3ZG1zQ-F_TR9xZUHQm5_6oVijw6o3WBVKg0UCDRpvZV95qldocBDcNbZLi5gMlJ-RVLCKzfgTCh_fFhAdNLDtTmzB8SpN_qGjxH67wIuWBalnNiYbNfyNTl7g_9AXJlZuLXN7Czupo38ddKYtBeWeS_V7dRFX5rEFp43jc5Q_79uqRk6QnrSurtVc2LVg=w1920-h902"
                                    height="60" alt="quatrellothebridge"
                                    style="line-height:100%;outline:none;text-decoration:none;border:0" class="CToWUd"
                                    data-bit="iit"></a></div>
                        <hr style="margin-top:24px;margin-bottom:24px;border:0;border-bottom:1px solid #c1c7d0">
                        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-collapse:collapse">
                            <tbody>
                                <tr>
                                    <td align="center"><img
                                            src="https://www.iai.co.il/drupal/sites/default/files/2022-02/IAI%20Worldwide.jpg"
                                            height="142" border="0" alt=""
                                            style="border:0;line-height:100%;outline:none;text-decoration:none"
                                            class="CToWUd a6T" data-bit="iit" tabindex="0">
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <h1
                            style="margin-bottom:0;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;font-size:24px;font-weight:500;letter-spacing:-0.01em;color:#172b4d;line-height:28px;margin-top:40px">
                            ¡Ya falta poco!</h1>
                        <p
                            style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;font-size:14px;font-weight:400;letter-spacing:-0.005em;color:#091e42;line-height:20px;margin-top:12px">
                            <a style="text-decoration:none;color:inherit">Hola, ${username}:</a></p>
                        <p
                            style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;font-size:14px;font-weight:400;letter-spacing:-0.005em;color:#091e42;line-height:20px;margin-top:12px">
                            Para terminar de configurar tu cuenta y empezar a usar Pictures World Wide, confirma que
                            tenemos tu correo electrónico correcto.</p>
                        <div style="margin-top:28px"><a
                                href="http://127.0.0.1:3000/account-verify/${jwt}"
                                style="box-sizing:border-box;border-radius:3px;border-width:0;border:none;display:inline-flex;font-style:normal;font-size:inherit;height:2.28571429em;line-height:2.28571429em;margin:0;outline:none;padding:0 12px;text-align:center;vertical-align:middle;white-space:nowrap;text-decoration:none;background:#0052cc;color:#ffffff"
                                target="_blank"
                                >Verifica tu correo electrónico</a></div>
                        <hr style="margin-top:24px;margin-bottom:24px;border:0;border-bottom:1px solid #c1c7d0">
                                <tbody>
                                    <tr>
                                        <td valign="top" align="center"
                                            style="padding-top:10px;line-height:18px;text-align:center;font-weight:none;font-size:12px;color:#505f79">
                                            <span>Has recibido este mensaje de parte de PicturesWorldWide</span><br></td>
                                    </tr>
                                    <tr valign="top">
                                        <td align="center" style="padding-top:15px;padding-bottom:30px"><img
                                                    src="https://lh3.googleusercontent.com/fife/AAbDypArJ-aV5se_A23aV_kFK_yWjcDo7hSFx_BE1rPa4VdvlFBVVMlcVLlE7lChtVgb2Zys7AyOngCx39S2CmxZiZ_b8jN_cx2YRPlrZaJSOr6yHMpkpdSR9cz8yBObZ1ohXrwdS50uiBn7feSoL7_-8ngg-EKZqfxkugdrUJKLYXXi4jFbVoTPUqqFEFCt5Vc0itk7FhHCMNwGolQ5Q60HzZAVgWduZJS-dw0TWPZjAhXGVpmDHT78SVEn6wvUz_E4snyxF39Ys1x_ApoLlamKasy-aIbYoxfRS67k0Dg0Vkqfeblc-B7uxzKkar6ROdvG53ZLTyQ1SURVRWTT1b7mEsdTGANwhesu_Nw0VNtro7hQT3TB1Voz1b_YUKO2Dq0Z1dQ4KpuBCNwpx8aas0dPCckNWrKU0TYyE2Swys3u8VYyt60735c2koVw_z5An686NtQUUGxASVNQhemFKlHgScpipn3GUTpp4p6mRGkkF3CCWEgfQtKqQcrLct7sMYfIWxIEmlTkkTjVeEIjSSYHmef99QpS3DwDhPQZuvuWjncYdMmBkNHdR9ttp1-SZCtasG5nF9muwIFkQFWNZPffivUXwU8h_hNMvlX4P0skFmpQh_dyNuzoMByt-8ddalor9FNpyMSO95Y9SeVSIfOT-XujdMa58z1Q6J6uxwjxrbjXRX4Kj8MM7SoPSOPTMOdIBxeG_taEEhak1yChAF8qvxd3RkqWCBHGm1TqmKuuYOkdiHgzmE_ZxPEPtlqN08JrBTISe8BqsN1Gr1amLiC2N4khOJ1k4TvpTgIaJ_qycc_Q90NsPZTjVstr6A7QBZiU1SKZXfx9RKO7a4uRqBBhU2LlF4aMFwRLl5hdAM6LVHeTMJIJ16tOjnczjUO6WcplsQTkdVBFvS5e4H90mvMbXRmw83dS6lyEFce1S7itx82UrrXCOvAprSduzZDTWESHLHmZlLTQrn3r5_lHyRMOMEq_AezYrFGGEY7RJ9bULuQ5Rml-RWRsKP_lqCgKZ1_B1QlKUNQ_lRa51wSo7JshSR4HOBxZMgpP8npFtIgRFvij0_REzTubR4FGoWNk7bQCEBLKq3KpBGUOUukL2w7vMbnyH_QmvhpsBHV29BObH40u6bnDbb3BX_YhchYPdgYYLHCp5elGEamTneTtfp_y_EUOGLLImQfuW6YR0eqAv7ot-NpvMAXlFt5gObxrjfWXrGTLqiG1donhjPf4cjFL95s9TVBGfuMeYJ2I-tDVmZkAsvF-vZWiZ4NRVmpN-ENrNQkE4po4AlSaP-oJZaChq142823x6BHJhAc_w211vsGLEvJSx7fe0pvZDPYvP2iXyLn2PYHQBw8Saga6nho5IIrg8EieqQ0LInG9x8l5jU9nbfaWrXW8kK8g-I7tnWBxrIj_N3ZG1zQ-F_TR9xZUHQm5_6oVijw6o3WBVKg0UCDRpvZV95qldocBDcNbZLi5gMlJ-RVLCKzfgTCh_fFhAdNLDtTmzB8SpN_qGjxH67wIuWBalnNiYbNfyNTl7g_9AXJlZuLXN7Czupo38ddKYtBeWeS_V7dRFX5rEFp43jc5Q_79uqRk6QnrSurtVc2LVg=w1920-h902"
                                                    width="114" border="0" alt="quaTrello"
                                                    style="border:0;line-height:100%;outline:none;text-decoration:none;display:block;color:#4c9ac9"
                                                    class="CToWUd" data-bit="iit"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    </tbody>
</table>
        </body>
      </html>`
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email enviado: ' + info.response);
        console.log(info.accepted)
      }
    });

  },
  /**
   * Envia un email de confirmación de cambio de contraseña.
   * @param {string} user_email - dirección de email del usuario.
   */
  passconfirm: async (user_email) => {
    var mailOptions = {
      from: 'quatrellothebridge@gmail.com',
      to: user_email,
      subject: 'Confirmación de cambio de contraseña',
      text: "",
      html: `<!doctype html>
      <html ⚡4email>
        <head>
          <meta charset="utf-8">
        </head>
        <body>
          <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-collapse:collapse">
            <tbody>
              <tr>
               <td align="center">
                <div style="max-width:520px;margin:0 auto">
                    <div
                        style="vertical-align:top;text-align:left;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;font-size:14px;font-weight:400;letter-spacing:-0.005em;color:#091e42;line-height:40px">
                        <div style="padding-top:30px;padding-bottom:20px;vertical-align:top;text-align:center"><img
                                    src="https://lh3.googleusercontent.com/fife/AAbDypArJ-aV5se_A23aV_kFK_yWjcDo7hSFx_BE1rPa4VdvlFBVVMlcVLlE7lChtVgb2Zys7AyOngCx39S2CmxZiZ_b8jN_cx2YRPlrZaJSOr6yHMpkpdSR9cz8yBObZ1ohXrwdS50uiBn7feSoL7_-8ngg-EKZqfxkugdrUJKLYXXi4jFbVoTPUqqFEFCt5Vc0itk7FhHCMNwGolQ5Q60HzZAVgWduZJS-dw0TWPZjAhXGVpmDHT78SVEn6wvUz_E4snyxF39Ys1x_ApoLlamKasy-aIbYoxfRS67k0Dg0Vkqfeblc-B7uxzKkar6ROdvG53ZLTyQ1SURVRWTT1b7mEsdTGANwhesu_Nw0VNtro7hQT3TB1Voz1b_YUKO2Dq0Z1dQ4KpuBCNwpx8aas0dPCckNWrKU0TYyE2Swys3u8VYyt60735c2koVw_z5An686NtQUUGxASVNQhemFKlHgScpipn3GUTpp4p6mRGkkF3CCWEgfQtKqQcrLct7sMYfIWxIEmlTkkTjVeEIjSSYHmef99QpS3DwDhPQZuvuWjncYdMmBkNHdR9ttp1-SZCtasG5nF9muwIFkQFWNZPffivUXwU8h_hNMvlX4P0skFmpQh_dyNuzoMByt-8ddalor9FNpyMSO95Y9SeVSIfOT-XujdMa58z1Q6J6uxwjxrbjXRX4Kj8MM7SoPSOPTMOdIBxeG_taEEhak1yChAF8qvxd3RkqWCBHGm1TqmKuuYOkdiHgzmE_ZxPEPtlqN08JrBTISe8BqsN1Gr1amLiC2N4khOJ1k4TvpTgIaJ_qycc_Q90NsPZTjVstr6A7QBZiU1SKZXfx9RKO7a4uRqBBhU2LlF4aMFwRLl5hdAM6LVHeTMJIJ16tOjnczjUO6WcplsQTkdVBFvS5e4H90mvMbXRmw83dS6lyEFce1S7itx82UrrXCOvAprSduzZDTWESHLHmZlLTQrn3r5_lHyRMOMEq_AezYrFGGEY7RJ9bULuQ5Rml-RWRsKP_lqCgKZ1_B1QlKUNQ_lRa51wSo7JshSR4HOBxZMgpP8npFtIgRFvij0_REzTubR4FGoWNk7bQCEBLKq3KpBGUOUukL2w7vMbnyH_QmvhpsBHV29BObH40u6bnDbb3BX_YhchYPdgYYLHCp5elGEamTneTtfp_y_EUOGLLImQfuW6YR0eqAv7ot-NpvMAXlFt5gObxrjfWXrGTLqiG1donhjPf4cjFL95s9TVBGfuMeYJ2I-tDVmZkAsvF-vZWiZ4NRVmpN-ENrNQkE4po4AlSaP-oJZaChq142823x6BHJhAc_w211vsGLEvJSx7fe0pvZDPYvP2iXyLn2PYHQBw8Saga6nho5IIrg8EieqQ0LInG9x8l5jU9nbfaWrXW8kK8g-I7tnWBxrIj_N3ZG1zQ-F_TR9xZUHQm5_6oVijw6o3WBVKg0UCDRpvZV95qldocBDcNbZLi5gMlJ-RVLCKzfgTCh_fFhAdNLDtTmzB8SpN_qGjxH67wIuWBalnNiYbNfyNTl7g_9AXJlZuLXN7Czupo38ddKYtBeWeS_V7dRFX5rEFp43jc5Q_79uqRk6QnrSurtVc2LVg=w1920-h902"
                                    height="60" alt="quatrellothebridge"
                                    style="line-height:100%;outline:none;text-decoration:none;border:0" class="CToWUd"
                                    data-bit="iit"></a></div>
                        <hr style="margin-top:24px;margin-bottom:24px;border:0;border-bottom:1px solid #c1c7d0">
                        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-collapse:collapse">
                            <tbody>
                                <tr>
                                    <td align="center"><img
                                            src="https://www.iai.co.il/drupal/sites/default/files/2022-02/IAI%20Worldwide.jpg"
                                            height="142" border="0" alt=""
                                            style="border:0;line-height:100%;outline:none;text-decoration:none"
                                            class="CToWUd a6T" data-bit="iit" tabindex="0">
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <h1
                            style="margin-bottom:0;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;font-size:24px;font-weight:500;letter-spacing:-0.01em;color:#172b4d;line-height:28px;margin-top:40px">
                            ¡Ya falta poco!</h1>
                        <p
                            style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;font-size:14px;font-weight:400;letter-spacing:-0.005em;color:#091e42;line-height:20px;margin-top:12px">
                            <a style="text-decoration:none;color:inherit">Hola, ${username}:</a></p>
                        <p
                            style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;font-size:14px;font-weight:400;letter-spacing:-0.005em;color:#091e42;line-height:20px;margin-top:12px">
                            Para terminar de configurar tu cuenta y empezar a usar Pictures World Wide, confirma que
                            tenemos tu correo electrónico correcto.</p>
                        <div style="margin-top:28px"><a
                                href="http://127.0.0.1:3000/account-verify/${jwt}"
                                style="box-sizing:border-box;border-radius:3px;border-width:0;border:none;display:inline-flex;font-style:normal;font-size:inherit;height:2.28571429em;line-height:2.28571429em;margin:0;outline:none;padding:0 12px;text-align:center;vertical-align:middle;white-space:nowrap;text-decoration:none;background:#0052cc;color:#ffffff"
                                target="_blank"
                                >Verifica tu correo electrónico</a></div>
                        <hr style="margin-top:24px;margin-bottom:24px;border:0;border-bottom:1px solid #c1c7d0">
                                <tbody>
                                    <tr>
                                        <td valign="top" align="center"
                                            style="padding-top:10px;line-height:18px;text-align:center;font-weight:none;font-size:12px;color:#505f79">
                                            <span>Has recibido este mensaje de parte de PicturesWorldWide</span><br></td>
                                    </tr>
                                    <tr valign="top">
                                        <td align="center" style="padding-top:15px;padding-bottom:30px"><img
                                                    src="https://lh3.googleusercontent.com/fife/AAbDypArJ-aV5se_A23aV_kFK_yWjcDo7hSFx_BE1rPa4VdvlFBVVMlcVLlE7lChtVgb2Zys7AyOngCx39S2CmxZiZ_b8jN_cx2YRPlrZaJSOr6yHMpkpdSR9cz8yBObZ1ohXrwdS50uiBn7feSoL7_-8ngg-EKZqfxkugdrUJKLYXXi4jFbVoTPUqqFEFCt5Vc0itk7FhHCMNwGolQ5Q60HzZAVgWduZJS-dw0TWPZjAhXGVpmDHT78SVEn6wvUz_E4snyxF39Ys1x_ApoLlamKasy-aIbYoxfRS67k0Dg0Vkqfeblc-B7uxzKkar6ROdvG53ZLTyQ1SURVRWTT1b7mEsdTGANwhesu_Nw0VNtro7hQT3TB1Voz1b_YUKO2Dq0Z1dQ4KpuBCNwpx8aas0dPCckNWrKU0TYyE2Swys3u8VYyt60735c2koVw_z5An686NtQUUGxASVNQhemFKlHgScpipn3GUTpp4p6mRGkkF3CCWEgfQtKqQcrLct7sMYfIWxIEmlTkkTjVeEIjSSYHmef99QpS3DwDhPQZuvuWjncYdMmBkNHdR9ttp1-SZCtasG5nF9muwIFkQFWNZPffivUXwU8h_hNMvlX4P0skFmpQh_dyNuzoMByt-8ddalor9FNpyMSO95Y9SeVSIfOT-XujdMa58z1Q6J6uxwjxrbjXRX4Kj8MM7SoPSOPTMOdIBxeG_taEEhak1yChAF8qvxd3RkqWCBHGm1TqmKuuYOkdiHgzmE_ZxPEPtlqN08JrBTISe8BqsN1Gr1amLiC2N4khOJ1k4TvpTgIaJ_qycc_Q90NsPZTjVstr6A7QBZiU1SKZXfx9RKO7a4uRqBBhU2LlF4aMFwRLl5hdAM6LVHeTMJIJ16tOjnczjUO6WcplsQTkdVBFvS5e4H90mvMbXRmw83dS6lyEFce1S7itx82UrrXCOvAprSduzZDTWESHLHmZlLTQrn3r5_lHyRMOMEq_AezYrFGGEY7RJ9bULuQ5Rml-RWRsKP_lqCgKZ1_B1QlKUNQ_lRa51wSo7JshSR4HOBxZMgpP8npFtIgRFvij0_REzTubR4FGoWNk7bQCEBLKq3KpBGUOUukL2w7vMbnyH_QmvhpsBHV29BObH40u6bnDbb3BX_YhchYPdgYYLHCp5elGEamTneTtfp_y_EUOGLLImQfuW6YR0eqAv7ot-NpvMAXlFt5gObxrjfWXrGTLqiG1donhjPf4cjFL95s9TVBGfuMeYJ2I-tDVmZkAsvF-vZWiZ4NRVmpN-ENrNQkE4po4AlSaP-oJZaChq142823x6BHJhAc_w211vsGLEvJSx7fe0pvZDPYvP2iXyLn2PYHQBw8Saga6nho5IIrg8EieqQ0LInG9x8l5jU9nbfaWrXW8kK8g-I7tnWBxrIj_N3ZG1zQ-F_TR9xZUHQm5_6oVijw6o3WBVKg0UCDRpvZV95qldocBDcNbZLi5gMlJ-RVLCKzfgTCh_fFhAdNLDtTmzB8SpN_qGjxH67wIuWBalnNiYbNfyNTl7g_9AXJlZuLXN7Czupo38ddKYtBeWeS_V7dRFX5rEFp43jc5Q_79uqRk6QnrSurtVc2LVg=w1920-h902"
                                                    width="114" border="0" alt="quaTrello"
                                                    style="border:0;line-height:100%;outline:none;text-decoration:none;display:block;color:#4c9ac9"
                                                    class="CToWUd" data-bit="iit"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    </tbody>
</table>
        </body>
      </html>`
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email enviado: ' + info.response);
        console.log(info.accepted)
      }
    });
  },
}


module.exports = email;



