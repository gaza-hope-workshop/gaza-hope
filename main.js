/* Safe helpers: no-op if the element doesn't exist on the current page,
   so the same main.js file can run across index/about/transparency/updates/contact */
function setText(id, val) { const el = document.getElementById(id); if (el && val !== undefined) el.innerText = val; }
function setHTML(id, val) { const el = document.getElementById(id); if (el && val !== undefined) el.innerHTML = val; }

let currentLang = localStorage.getItem('ghLang') || 'ar';
        const translations = {
            ar: {
                brandTitle: 'أمل غزة',
                brandSub: 'GAZA HOPE',
                langLabel: 'English',
                heroBadge: '<i class="fa-solid fa-fire"></i> استغاثة ميدانية عاجلة لإنقاذ الأطفال والمبتورين',
                title1: 'من تحت الأنقاض..',
                title2: 'نصنع أسرّة تحمي أجساد أطفالنا الجرحى',
                leadText: 'مشروع ميداني قيد التطوير والعمل المستمر؛ نستخرج حديد التسليح من المباني المدمرة بنيران الحرب، ونعيد تشكيله وتربيطه يدوياً بإتقان متين لنصنع أسرّة طوارئ مرتفعة تحمي الأطفال والمبتورين في غزة من الموت برداً على التراب المباشر.',
                storyTag: '🔥 المعركة الحية من قلب الخيام',
                storyText: 'طفل بعمر عشر سنوات، خرج للتو من عملية بتر، ينام على تراب بارد ورطب داخل خيمة تهتز مع كل انفجار قريب. هذا يتكرر كل ليلة في غزة.<br><br>مع كل موجة قصف، يطول عدد الأطفال والشباب الذين بُترت أطرافهم. النوم المباشر على الأرض يهدد جروحهم المفتوحة بالالتهاب والألم المضاعف.<br><br><strong>نحن في "ورشة أمل غزة" رفضنا أن ينام جرحانا على التراب.</strong><br><br>من قلب الركام، نستخرج حديد التسليح المدفون تحت المباني المهدمة، ونعيد تشكيله ولحامه يدوياً ليتحول إلى سرير مرتفع ومتين يحمي الجرح ويمنحه فرصة حقيقية للشفاء بدل الالتهاب.<br><br><strong>ومع كل سرير، وجبة غذائية دافئة</strong> — لأن جسداً يتعافى من بتر يحتاج طاقة ليقاوم، لا مجرد مكان للنوم.<br><br>🔗 <strong>طفل مبتور ينتظر سريراً ووجبة دافئة الليلة. ساعدنا نصله قبل الفجر.</strong>',
                trustWhoTitle: 'من نحن',
                trustWhoText: 'فريق ميداني صغير من داخل غزة، نعمل يدوياً على استخراج الحديد من الركام وتحويله لأسِرّة طوارئ. نوثّق كل مرحلة من عملنا بالصوت والصورة على قنواتنا الرسمية أدناه، ونرحب بأي تواصل أو استفسار مباشر عبر واتساب.',
                trustTransTitle: 'التزامنا بالشفافية',
                trustTransText: 'عنوان محفظتنا ثابت ومعلن، وكل معاملة تصلها قابلة للتحقق مباشرة عبر مستكشف البلوك تشين (رابط Tronscan أعلاه). نلتزم بنشر تحديثات دورية موثقة بالصور لكل دفعة أسِرّة يتم تسليمها.',
                trustConsentTitle: 'كرامة من نصورهم',
                trustConsentText: 'الصور المستخدمة في هذه الحملة تُنشر بموافقة صريحة من الأشخاص الظاهرين فيها أو ذويهم، احتراماً لخصوصيتهم وكرامتهم في أصعب الظروف.',
                statsTitle: '📊 أرقامنا الحية — محدّثة دورياً',
                statBedsLabel: 'سرير تم تسليمه',
                statMealsLabel: 'وجبة غذائية وُزّعت',
                statFamiliesLabel: 'عائلة تم الوصول إليها',
                statGoalLabelPrefix: 'من هدف',
                statsUpdatedPrefix: 'آخر تحديث:',
                statsUnavailable: 'الأرقام قيد التحديث، تحقق لاحقاً.',
                tiersHeader: '⚡ حدد مساهمتك المباشرة بأسلوب الدفع المناسب لك:',
                t1Text: 'يوفر أدوات التقطيع والشد اليدوي لاستخراج وتجهيز الحديد من الركام',
                t2Text: 'يوفر أسيّاخ حديد إضافية وأسلاك تربيط مقواة وحزمة عزل حراري للسرير',
                t3Text: 'تكفّل بتصنيع وتربيط سرير طوارئ مرتفع بالكامل يدوياً لطفل جريح',
                t4Text: 'كفالة سرير مكتمل + حزمة إغاثية وغذائية مرافقة للعائلة',
                usdtDesc: 'الوسيلة الأسرع لشراء أسلاك التربيط والمواد الخام فوراً',
                cardDesc: 'بما أنه لا يوجد حساب بنكي يستقبل تحويلات مباشرة، التبرع بالبطاقة يتم عبر خطوتين بسيطتين:',
                cardStep1: 'اشترِ USDT ببطاقتك عبر أحد بوابات الدفع الموثوقة أدناه (تذهب العملة أولاً إلى محفظتك الشخصية)',
                cardStep2: 'انسخ عنوان محفظتنا من الأعلى وأرسل مبلغ التبرع إليه من محفظتك عبر شبكة TRC20',
                cardFootnote: '⚠️ هذه بوابات دفع خارجية مستقلة وليست جزءاً من حملتنا — تأكد من إرسال المبلغ بعدها لعنوان محفظتنا يدوياً (الخطوة 2).',
                copyBtnText: 'نسخ عنوان المحفظة',
                verifyLinkText: 'تحقق من كل معاملة مباشرة على البلوك تشين (Tronscan)',
                securityBannerText: 'لن نطلب منك أبداً رقم بطاقتك، رمز CVV، أو كلمة مرور محفظتك عبر أي رسالة أو مكالمة. تبرعك يتم فقط عبر إرسال USDT لعنوان المحفظة المعلن هنا، أو عبر بوابات الدفع الموثقة أدناه.',
                walletNote: '🔒 هذا العنوان مخصص حصرياً لحملة أمل غزة، ولا يُستخدم لأي غرض آخر.',
                cardBtnText: 'الخطوة 1: شراء USDT عبر MoonPay',
                altGatewaysText: 'بوابات دفع إضافية مدمجة:',
                shareBtnMainText: 'أنشر الحملة وكن سبباً في النجاة 🔗',
                topShareText: 'أنشر الحملة 🔗',
                socialTitle: 'تابع وثّق إنجازات الورشة الميدانية',
                stickyUsdt: 'USDT',
                stickyCard: 'دفع بالبطاقة',
                stickyShare: 'أنشر الحملة',
                faqHeader: '❓ الأسئلة الشائعة / Frequently Asked Questions',
                faqQ1: '🛏️ كيف يتم تصنيع الأسِرّة؟ / How are the emergency beds produced?',
                faqA1: 'ننتشل حديد التسليح مباشرة من تحت أنقاض المباني المدمرة في غزة. يقوم فريقنا المحلي بتقويم الحديد وقطعه وتربيطه يدوياً بأسلاك مقواة وبإتقان متين جداً لإنشاء هياكل أسرّة مرتفعة ومتينة، مزودة بقواعد معزولة لرفع الأطفال المبتورين والرجال الجرحى عن التراب البارد والمبتل، وذلك في ظل انقطاع الكهرباء التام.',
                faqQ2: '🚚 كيف تضمنون التوزيع المباشر؟ / How do you ensure direct delivery?',
                faqA2: 'يعمل فريقنا الميداني مباشرة داخل مخيمات النزوح. نُجري تقييمات يومية لتحديد حالات البتر الجديدة والأطفال الجرحى الذين يُجبرون على النوم على التراب العاري. يتم تسليم الأسِرّة وتركيبها يدوياً داخل خيامهم مباشرة برفقة حزمة إغاثية مرافقة للعائلة.',
                faqQ3: '💡 لماذا التبرع بالكريبتو (USDT)؟ / Why USDT / Crypto Donations?',
                faqA3: '<strong>سيولة ميدانية فورية وصفر قيود بنكية:</strong><br>بسبب الانهيار الشديد في النظام البنكي والقيود الصارمة على التحويلات إلى غزة، تتعرض الأموال التقليدية لتعطيل طويل أو حظر على المنصات. يوفر USDT سيولة فورية ومباشرة لمحفظتنا المحلية، مما يتيح لنا سحب الكاش فوراً في الميدان لشراء أدوات الشد، أسلاك التربيط، والمواد الخام دون الاعتماد على وسطاء أو التعرض لمخاطر حظر الحملة.',
                toastUsdt: 'تم نسخ عنوان المحفظة بنجاح!',
                toastShare: 'تم نسخ رابط الحملة بنجاح! شاركه مع أصدقائك.',

                /* Shared navigation & footer */
                navHome: 'الرئيسية',
                navAbout: 'من نحن',
                navTransparency: 'الشفافية',
                navUpdates: 'آخر التحديثات',
                navContact: 'تواصل معنا',
                navActivities: 'الأنشطة والفيديوهات',
                navDonate: 'تبرع الآن',
                footerRights: 'جميع الحقوق محفوظة',
                footerTagline: 'من قلب الركام، نصنع الأمل.',

                /* About page */
                aboutPageTitle: 'من نحن',
                aboutIntro: 'ورشة أمل غزة فريق ميداني صغير من داخل غزة، تشكّل استجابةً مباشرة لأزمة إنسانية متفاقمة: أطفال وشباب فقدوا أطرافهم تحت القصف، ولا يجدون حتى مكاناً آمناً للنوم أثناء تعافيهم. قررنا نتصرف بدل ما ننتظر.',
                aboutProcessTitle: 'كيف نعمل؟',
                aboutProcessText: 'مع انعدام أي مواد خام بالقطاع، نلجأ للركام نفسه: نسحب أسياخ الحديد المدفونة تحت المباني المهدمة، نعيد تشكيلها بأيدينا، ونلحمها قطعة قطعة لتتحول إلى سرير مرتفع ومتين. نستخدم وحدات طاقة شمسية لتشغيل معدات اللحام رغم انقطاع الكهرباء الكامل. ومع كل سرير، نُرفق وجبة غذائية دافئة وكاملة.',
                aboutConsentTitle: 'كرامة من نوثّقهم',
                aboutConsentText: 'كل صورة أو فيديو ننشره من عملنا الميداني يُنشر بموافقة صريحة من الأشخاص الظاهرين فيه أو ذويهم. نؤمن إن التوثيق الصادق لا يتعارض مع احترام خصوصية وكرامة من نخدمهم.',
                aboutContactTitle: 'تواصل مباشر معنا',
                aboutContactText: 'أي استفسار عن عملنا، أو لو حابب تتحقق من أي تفصيل بنفسك، نرحب بتواصلك المباشر عبر واتساب أو البريد الإلكتروني — انتقل لصفحة التواصل.',

                /* Transparency page */
                transPageTitle: 'الشفافية والتوثيق المالي',
                transIntro: 'نؤمن إن الشفافية المالية أهم من أي شعار. هذي الصفحة تجمع كل وسيلة تحقق متاحة لك كمتبرع، بدون أي وسيط.',
                transWalletTitle: 'محفظة USDT الرسمية (TRC20)',
                transReportsTitle: 'التقارير الدورية',
                transReportsText: 'نلتزم بنشر تحديث موثق (صور + أرقام) عند كل دفعة أسِرّة يتم تسليمها. تابع صفحة "آخر التحديثات" للاطلاع على كل تقرير بتاريخه.',

                /* Updates page */
                updatesPageTitle: 'آخر التحديثات',
                updatesIntro: 'كل تحديث هنا موثّق بتاريخ حقيقي، وينشره فريقنا الميداني مباشرة بعد كل دفعة تسليم.',
                updatesEmptyText: 'لا توجد تحديثات منشورة بعد — تابعنا قريباً.',
                updatesLoadingText: 'جارٍ تحميل آخر التحديثات...',

                /* Activities page */
                activitiesPageTitle: 'الأنشطة والفيديوهات',
                activitiesIntro: 'لقطات وفيديوهات حقيقية من داخل الورشة — من استخراج الحديد من الركام إلى لحظة تسليم السرير لعائلة تنتظر.',
                activitiesEmptyText: 'لا توجد أنشطة منشورة بعد — تابعنا قريباً.',
                activitiesLoadingText: 'جارٍ تحميل الأنشطة...',
                activityVideoBadge: '🎥 فيديو',
                activityPhotoBadge: '📷 صورة',


                /* Contact page */
                contactPageTitle: 'تواصل معنا',
                contactIntro: 'أي سؤال، استفسار، أو حتى لو حابب تتحقق من أي معلومة بنفسك قبل التبرع — تواصلنا مفتوح ونرحب فيه.',
                contactWhatsappBtn: 'تواصل عبر واتساب',
                contactEmailLabel: 'أو راسلنا عبر البريد الإلكتروني:',
                contactSocialTitle: 'تابعنا على وسائل التواصل'
            },
            en: {
                brandTitle: 'GAZA HOPE',
                brandSub: 'Emergency Beds Initiative',
                langLabel: 'العربية',
                heroBadge: '<i class="fa-solid fa-fire"></i> Urgent Field Appeal to Save Amputated Children',
                title1: 'From the Rubble..',
                title2: 'We Forge Beds to Shield Wounded Children',
                leadText: 'An active field project under development; we extract buried iron rebar from destroyed homes to hand-bind and reinforce elevated emergency beds that lift amputated children in Gaza off the freezing wet ground.',
                storyTag: '🔥 Live Field Battle From Tent Camps',
                storyText: 'A ten-year-old, hours out of amputation surgery, sleeps on cold, damp ground inside a tent that shakes with every nearby blast. This repeats every night in Gaza.<br><br>With every wave of strikes, more children and young people lose limbs. Sleeping directly on the ground threatens their open wounds with infection and doubled pain.<br><br><strong>At Gaza Hope Workshop, we refused to let our wounded sleep on the dirt.</strong><br><br>From the rubble itself, we pull buried iron rebar from collapsed buildings, reshape it, and hand-weld it into a raised, sturdy bed that protects the wound and gives it a real chance to heal instead of infect.<br><br><strong>And with every bed, a warm meal</strong> — because a body healing from amputation needs strength to endure, not just a place to sleep.<br><br>🔗 <strong>A newly amputated child is waiting for a bed and a warm meal tonight. Help us reach them before dawn.</strong>',
                trustWhoTitle: 'Who We Are',
                trustWhoText: 'A small field team based inside Gaza, manually extracting iron from rubble and turning it into emergency beds. We document every stage of our work on our official channels below, and welcome direct questions via WhatsApp.',
                trustTransTitle: 'Our Transparency Commitment',
                trustTransText: 'Our wallet address is fixed and public, and every transaction it receives can be independently verified on the blockchain (Tronscan link above). We commit to posting regular, photo-documented updates for every batch of beds delivered.',
                trustConsentTitle: 'Dignity of Those We Photograph',
                trustConsentText: 'Photos used in this campaign are published with the explicit consent of the people shown, or their guardians, out of respect for their privacy and dignity in the hardest of circumstances.',
                statsTitle: '📊 Our Live Impact — Updated Regularly',
                statBedsLabel: 'Beds Delivered',
                statMealsLabel: 'Meals Distributed',
                statFamiliesLabel: 'Families Reached',
                statGoalLabelPrefix: 'of',
                statsUpdatedPrefix: 'Last updated:',
                statsUnavailable: 'Numbers are being refreshed, check back soon.',
                tiersHeader: '⚡ Select Your Direct Impact Tier & Preferred Payment Method:',
                t1Text: 'Provides manual cutting & binding tools to extract and prepare iron',
                t2Text: 'Provides extra iron bars, heavy-duty binding wires & insulation pack',
                t3Text: 'Sponsor the full hand-binding & fabrication of an emergency bed',
                t4Text: 'Full bed sponsorship + complete family food & relief care package',
                usdtDesc: 'Fastest direct method to buy binding wires and raw materials instantly',
                cardDesc: 'Since we have no bank account able to receive direct transfers, card donations work in two simple steps:',
                cardStep1: 'Buy USDT with your card through one of the trusted gateways below (it lands in your own personal wallet first)',
                cardStep2: 'Copy our wallet address above and send your donation to it from your wallet, over the TRC20 network',
                cardFootnote: '⚠️ These are independent third-party payment gateways, not part of our campaign — make sure to send the amount to our wallet address afterward (Step 2).',
                copyBtnText: 'Copy Wallet Address',
                verifyLinkText: 'Verify every transaction live on the blockchain (Tronscan)',
                securityBannerText: "We will never ask for your card number, CVV, or wallet password via message or call. Your donation only happens by sending USDT to the wallet address published here, or via the verified payment gateways below.",
                walletNote: '🔒 This address is used exclusively for the Gaza Hope campaign, for no other purpose.',
                cardBtnText: 'Step 1: Buy USDT via MoonPay',
                altGatewaysText: 'Additional Card Gateways:',
                shareBtnMainText: 'Share Campaign & Save a Child 🔗',
                topShareText: 'Share Campaign 🔗',
                socialTitle: 'Follow Our Daily Field Achievements',
                stickyUsdt: 'USDT',
                stickyCard: 'Pay with Card',
                stickyShare: 'Share Campaign',
                faqHeader: '❓ Frequently Asked Questions / الأسئلة الشائعة',
                faqQ1: '🛏️ How are the emergency beds produced? / كيف يتم تصنيع الأسِرّة؟',
                faqA1: 'We salvage buried iron rebar directly from destroyed rubble in Gaza. Amid total power blackouts, our local team hand-binds and tightly secures this salvaged iron using heavy-duty binding wire to craft sturdy, elevated bed frames fitted with insulated platforms to lift amputated children off the freezing, wet dirt floor.',
                faqQ2: '🚚 How do you ensure direct delivery? / كيف تضمنون التوزيع المباشر؟',
                faqA2: 'Our field team conducts daily assessments inside displacement camps. Beds are hand-delivered and assembled directly inside the tents of newly amputated children and severely wounded patients.',
                faqQ3: '💡 Why USDT / Crypto Donations? / لماذا التبرع بالكريبتو (USDT)؟',
                faqA3: '<strong>Immediate Field Cash & Zero Banking Blockades:</strong><br>Traditional wire transfers to Gaza face severe delays, bank freezes, and platform restrictions. USDT provides <strong>instant liquidity</strong> directly to our field wallet. This allows us to instantly withdraw cash on the ground to purchase hand-binding wire, manual tools, and raw materials without relying on third-party banking delays.',
                toastUsdt: 'USDT Address copied successfully!',
                toastShare: 'Campaign link copied! Share it with your friends.',

                /* Shared navigation & footer */
                navHome: 'Home',
                navAbout: 'About Us',
                navTransparency: 'Transparency',
                navUpdates: 'Latest Updates',
                navContact: 'Contact Us',
                navActivities: 'Activities & Videos',
                navDonate: 'Donate Now',
                footerRights: 'All rights reserved',
                footerTagline: 'From the rubble, we build hope.',

                /* About page */
                aboutPageTitle: 'Who We Are',
                aboutIntro: 'Gaza Hope Workshop is a small field team based inside Gaza, formed as a direct response to a worsening humanitarian crisis: children and young people who lost limbs under bombardment, with nowhere safe to sleep while they heal. We decided to act instead of wait.',
                aboutProcessTitle: 'How We Work',
                aboutProcessText: 'With no raw materials left anywhere in the strip, we turn to the rubble itself — pulling iron rods from collapsed buildings, reshaping them by hand, and welding them piece by piece into raised, sturdy beds. We use solar power units to run welding equipment through total blackouts. And with every bed, we include a full, warm meal.',
                aboutConsentTitle: 'Dignity of Those We Document',
                aboutConsentText: 'Every photo or video we publish from our field work is shared with the explicit consent of the people shown, or their guardians. We believe honest documentation and respecting the privacy and dignity of those we serve are not in conflict.',
                aboutContactTitle: 'Reach Us Directly',
                aboutContactText: 'Any question about our work, or if you\'d like to verify any detail yourself, we welcome direct contact via WhatsApp or email — visit the Contact page.',

                /* Transparency page */
                transPageTitle: 'Transparency & Financial Documentation',
                transIntro: 'We believe financial transparency matters more than any slogan. This page gathers every verification method available to you as a donor, with no middleman.',
                transWalletTitle: 'Official USDT Wallet (TRC20)',
                transReportsTitle: 'Periodic Reports',
                transReportsText: 'We commit to publishing a documented update (photos + numbers) with every batch of beds delivered. Follow the "Latest Updates" page to see every report, dated.',

                /* Updates page */
                updatesPageTitle: 'Latest Updates',
                updatesIntro: 'Every update here is dated and published directly by our field team right after each delivery batch.',
                updatesEmptyText: 'No updates published yet — check back soon.',
                updatesLoadingText: 'Loading latest updates...',

                /* Activities page */
                activitiesPageTitle: 'Activities & Videos',
                activitiesIntro: 'Real footage and photos from inside the workshop — from pulling iron out of the rubble to the moment a bed reaches a waiting family.',
                activitiesEmptyText: 'No activities published yet — check back soon.',
                activitiesLoadingText: 'Loading activities...',
                activityVideoBadge: '🎥 Video',
                activityPhotoBadge: '📷 Photo',


                /* Contact page */
                contactPageTitle: 'Contact Us',
                contactIntro: 'Any question, inquiry, or even if you\'d like to verify information yourself before donating — our line of contact is open and we welcome it.',
                contactWhatsappBtn: 'Message us on WhatsApp',
                contactEmailLabel: 'Or reach us by email:',
                contactSocialTitle: 'Follow us on social media'
            }
        };

        function applyLanguage() {
            document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
            document.documentElement.lang = currentLang;

            const data = translations[currentLang];
            setText('brandTitle', data.brandTitle);
            setText('brandSub', data.brandSub);
            setText('langLabel', data.langLabel);
            setHTML('heroBadge', data.heroBadge);
            setText('title1', data.title1);
            setText('title2', data.title2);
            setText('leadText', data.leadText);
            setText('storyTag', data.storyTag);
            setHTML('storyText', data.storyText);
            setText('trustWhoTitle', data.trustWhoTitle);
            setText('trustWhoText', data.trustWhoText);
            setText('trustTransTitle', data.trustTransTitle);
            setText('trustTransText', data.trustTransText);
            setText('trustConsentTitle', data.trustConsentTitle);
            setText('trustConsentText', data.trustConsentText);
            setText('statsTitle', data.statsTitle);
            setText('statBedsLabel', data.statBedsLabel);
            setText('statMealsLabel', data.statMealsLabel);
            setText('statFamiliesLabel', data.statFamiliesLabel);
            if (typeof renderStats === 'function') renderStats();
            setText('tiersHeader', data.tiersHeader);
            setText('t1Text', data.t1Text);
            setText('t2Text', data.t2Text);
            setText('t3Text', data.t3Text);
            setText('t4Text', data.t4Text);
            setText('usdtDesc', data.usdtDesc);
            setText('cardDesc', data.cardDesc);
            setText('cardStep1', data.cardStep1);
            setText('cardStep2', data.cardStep2);
            setText('cardFootnote', data.cardFootnote);
            setText('copyBtnText', data.copyBtnText);
            setText('verifyLinkText', data.verifyLinkText);
            setText('securityBannerText', data.securityBannerText);
            setText('walletNote', data.walletNote);
            setText('cardBtnText', data.cardBtnText);
            setText('altGatewaysText', data.altGatewaysText);
            setText('shareBtnMainText', data.shareBtnMainText);
            setText('topShareText', data.topShareText);
            setText('socialTitle', data.socialTitle);
            setText('stickyUsdt', data.stickyUsdt);
            setText('stickyCard', data.stickyCard);
            setText('stickyShare', data.stickyShare);
            setText('faqHeader', data.faqHeader);
            setText('faqQ1', data.faqQ1);
            setHTML('faqA1', data.faqA1);
            setText('faqQ2', data.faqQ2);
            setHTML('faqA2', data.faqA2);
            setText('faqQ3', data.faqQ3);
            setHTML('faqA3', data.faqA3);

            // Shared site navigation (present on every page)
            setText('navHome', data.navHome);
            setText('navAbout', data.navAbout);
            setText('navTransparency', data.navTransparency);
            setText('navUpdates', data.navUpdates);
            setText('navContact', data.navContact);
            setText('navActivities', data.navActivities);
            setText('navDonate', data.navDonate);
            setText('navHomeFooter', data.navHome);
            setText('navAboutFooter', data.navAbout);
            setText('navTransparencyFooter', data.navTransparency);
            setText('navUpdatesFooter', data.navUpdates);
            setText('navContactFooter', data.navContact);
            setText('navActivitiesFooter', data.navActivities);
            setText('footerRights', data.footerRights);
            setText('footerTagline', data.footerTagline);

            // About page
            setText('aboutPageTitle', data.aboutPageTitle);
            setHTML('aboutIntro', data.aboutIntro);
            setText('aboutProcessTitle', data.aboutProcessTitle);
            setHTML('aboutProcessText', data.aboutProcessText);
            setText('aboutConsentTitle', data.aboutConsentTitle);
            setHTML('aboutConsentText', data.aboutConsentText);
            setText('aboutContactTitle', data.aboutContactTitle);
            setHTML('aboutContactText', data.aboutContactText);

            // Transparency page
            setText('transPageTitle', data.transPageTitle);
            setHTML('transIntro', data.transIntro);
            setText('transWalletTitle', data.transWalletTitle);
            setText('transReportsTitle', data.transReportsTitle);
            setHTML('transReportsText', data.transReportsText);

            // Updates page
            setText('updatesPageTitle', data.updatesPageTitle);
            setHTML('updatesIntro', data.updatesIntro);
            if (typeof loadUpdates === 'function') loadUpdates();

            // Activities page
            setText('activitiesPageTitle', data.activitiesPageTitle);
            setHTML('activitiesIntro', data.activitiesIntro);
            if (typeof loadActivities === 'function') loadActivities();


            // Contact page
            setText('contactPageTitle', data.contactPageTitle);
            setHTML('contactIntro', data.contactIntro);
            setText('contactWhatsappBtn', data.contactWhatsappBtn);
            setText('contactEmailLabel', data.contactEmailLabel);
            setText('contactSocialTitle', data.contactSocialTitle);
        }

        function toggleLanguage() {
            currentLang = currentLang === 'ar' ? 'en' : 'ar';
            localStorage.setItem('ghLang', currentLang);
            applyLanguage();
        }

        /* SMART DIRECT WHATSAPP LAUNCHER */
        function openWhatsAppDirect() {
            var phone = "972592290793";
            var msg = encodeURIComponent("Hi, I would like to sponsor a bed and support children with Gaza Hope Workshop. How can I complete my donation today?");
            
            var appUrl = "whatsapp://send?phone=" + phone + "&text=" + msg;
            var webUrl = "https://api.whatsapp.com/send?phone=" + phone + "&text=" + msg;

            window.location.href = appUrl;

            setTimeout(function() {
                window.open(webUrl, '_blank');
            }, 500);
        }

        function copyCryptoAddress() {
            const address = document.getElementById('usdtAddress').innerText;
            navigator.clipboard.writeText(address);
            showToast(translations[currentLang].toastUsdt);
        }

        function shareCampaign() {
            const shareData = {
                title: 'GAZA HOPE | أمل غزة',
                text: 'ساهم معنا في تجهيز أسرّة طوارئ لحماية الأطفال والمبتورين في غزة من برودة التراب!',
                url: window.location.href
            };

            if (navigator.share) {
                navigator.share(shareData).catch(() => {});
            } else {
                navigator.clipboard.writeText(window.location.href);
                showToast(translations[currentLang].toastShare);
            }
        }

        function showToast(message) {
            const toast = document.getElementById('toast');
            toast.innerText = message;
            toast.style.display = 'block';
            setTimeout(() => { toast.style.display = 'none'; }, 3500);
        }

        /* LIVE STATS — reads stats.json, which is updated periodically by an external Python script */
        let statsData = null;

        function formatNumber(n) {
            return new Intl.NumberFormat(currentLang === 'ar' ? 'ar-EG-u-nu-latn' : 'en-US').format(n);
        }

        function animateValue(id, target) {
            const el = document.getElementById(id);
            if (!el) return;
            const duration = 900;
            const start = 0;
            const startTime = performance.now();
            function tick(now) {
                const progress = Math.min(1, (now - startTime) / duration);
                const current = Math.floor(start + (target - start) * progress);
                el.innerText = formatNumber(current);
                if (progress < 1) requestAnimationFrame(tick);
                else el.innerText = formatNumber(target);
            }
            requestAnimationFrame(tick);
        }

        function renderStats() {
            if (!document.getElementById('statsSection')) return; // page has no stats section — nothing to do
            const t = translations[currentLang];
            setText('statGoalPrefix', t.statGoalLabelPrefix);
            if (!statsData) {
                setText('statsUpdated', t.statsUnavailable);
                return;
            }
            animateValue('statBeds', statsData.beds_delivered || 0);
            animateValue('statMeals', statsData.meals_delivered || 0);
            animateValue('statFamilies', statsData.families_reached || 0);

            const raised = statsData.total_raised_usd || 0;
            const goal = statsData.goal_usd || 50000;
            setText('statRaised', '$' + formatNumber(raised));
            setText('statGoal', '$' + formatNumber(goal));
            const pct = Math.min(100, (raised / goal) * 100);
            const fillEl = document.getElementById('progressFill');
            if (fillEl) fillEl.style.width = pct + '%';

            if (statsData.last_updated) {
                const d = new Date(statsData.last_updated);
                const formatted = d.toLocaleDateString(currentLang === 'ar' ? 'ar-EG-u-nu-latn' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' });
                setText('statsUpdated', t.statsUpdatedPrefix + ' ' + formatted);
            }
        }

        async function loadStats() {
            if (!document.getElementById('statsSection')) return;
            try {
                const res = await fetch('stats.json?t=' + Date.now());
                if (!res.ok) throw new Error('stats.json not reachable');
                statsData = await res.json();
                renderStats();
            } catch (e) {
                setText('statsUpdated', translations[currentLang].statsUnavailable);
            }
        }

        /* UPDATES FEED — reads updates.json, which is appended to by add_update.py */
        let updatesData = null;

        function renderUpdates() {
            const list = document.getElementById('updatesList');
            if (!list) return;
            const t = translations[currentLang];
            if (!updatesData || updatesData.length === 0) {
                list.innerHTML = '';
                setText('updatesEmptyState', t.updatesEmptyText);
                return;
            }
            setText('updatesEmptyState', '');
            const locale = currentLang === 'ar' ? 'ar-EG-u-nu-latn' : 'en-US';
            list.innerHTML = updatesData.map(function(item) {
                const d = new Date(item.date);
                const formatted = d.toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' });
                const title = currentLang === 'ar' ? (item.title_ar || item.title_en || '') : (item.title_en || item.title_ar || '');
                const body = currentLang === 'ar' ? (item.body_ar || item.body_en || '') : (item.body_en || item.body_ar || '');
                const img = item.image ? '<img src="' + item.image + '" alt="' + title.replace(/"/g, '') + '" class="update-image" loading="lazy">' : '';
                return '<article class="update-card">' + img +
                    '<div class="update-body"><span class="update-date">' + formatted + '</span>' +
                    '<h3 class="update-title">' + title + '</h3>' +
                    '<p class="update-text">' + body + '</p></div></article>';
            }).join('');
        }

        async function loadUpdates() {
            const list = document.getElementById('updatesList');
            if (!list) return;
            setText('updatesEmptyState', translations[currentLang].updatesLoadingText);
            try {
                const res = await fetch('updates.json?t=' + Date.now());
                if (!res.ok) throw new Error('updates.json not reachable');
                const data = await res.json();
                updatesData = (data.updates || []).slice().sort(function(a, b) { return new Date(b.date) - new Date(a.date); });
                renderUpdates();
            } catch (e) {
                updatesData = null;
                setText('updatesEmptyState', translations[currentLang].updatesEmptyText);
            }
        }

        /* ACTIVITIES & VIDEOS GALLERY — reads activities.json, appended to by add_activity.py */
        let activitiesData = null;

        function youtubeEmbedUrl(youtubeId) {
            return 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(youtubeId);
        }

        function renderActivities() {
            const grid = document.getElementById('activitiesGrid');
            if (!grid) return;
            const t = translations[currentLang];
            if (!activitiesData || activitiesData.length === 0) {
                grid.innerHTML = '';
                setText('activitiesEmptyState', t.activitiesEmptyText);
                return;
            }
            setText('activitiesEmptyState', '');
            const locale = currentLang === 'ar' ? 'ar-EG-u-nu-latn' : 'en-US';
            grid.innerHTML = activitiesData.map(function(item) {
                const d = new Date(item.date);
                const formatted = d.toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' });
                const title = currentLang === 'ar' ? (item.title_ar || item.title_en || '') : (item.title_en || item.title_ar || '');
                const isVideo = item.type === 'video' && item.youtube_id;
                const media = isVideo
                    ? '<div class="video-embed-wrap"><iframe src="' + youtubeEmbedUrl(item.youtube_id) + '" title="' + title.replace(/"/g, '') + '" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>'
                    : '<img src="' + item.image + '" alt="' + title.replace(/"/g, '') + '" class="activity-photo" loading="lazy">';
                const badge = isVideo ? t.activityVideoBadge : t.activityPhotoBadge;
                return '<article class="activity-card">' + media +
                    '<div class="activity-body"><span class="activity-date">' + formatted + '</span>' +
                    '<div class="activity-title">' + title + '</div>' +
                    '<div class="activity-type-badge">' + badge + '</div></div></article>';
            }).join('');
        }

        async function loadActivities() {
            const grid = document.getElementById('activitiesGrid');
            if (!grid) return;
            setText('activitiesEmptyState', translations[currentLang].activitiesLoadingText);
            try {
                const res = await fetch('activities.json?t=' + Date.now());
                if (!res.ok) throw new Error('activities.json not reachable');
                const data = await res.json();
                activitiesData = (data.activities || []).slice().sort(function(a, b) { return new Date(b.date) - new Date(a.date); });
                renderActivities();
            } catch (e) {
                activitiesData = null;
                setText('activitiesEmptyState', translations[currentLang].activitiesEmptyText);
            }
        }

        /* Initialize the page in the visitor's previously chosen language (defaults to Arabic).
           Note: applyLanguage() already triggers loadUpdates()/loadActivities() internally —
           only loadStats() needs an explicit initial call since renderStats() alone doesn't fetch. */
        applyLanguage();
        loadStats();
