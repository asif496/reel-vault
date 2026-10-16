const fs = require('fs');

const rawText = `2/26/25, 3:32 AM - MD. Jahidul Islam: https://www.instagram.com/reel/DGIov3VJLZv/?igsh=ZjFkYzMzMDQzZg==
7/23/25, 3:28 AM - MD. Jahidul Islam: https://www.instagram.com/reel/DL4dKS5txnD/?igsh=ZjFkYzMzMDQzZg==
7/23/25, 3:48 AM - MD. Jahidul Islam: https://www.instagram.com/reel/DJMHoj4TCBJ/?igsh=ZjFkYzMzMDQzZg==
7/25/25, 3:09 AM - MD. Jahidul Islam: https://www.facebook.com/share/r/1E83zmuAib/
8/26/25, 2:57 AM - MD. Jahidul Islam: https://youtube.com/shorts/iubu83e-bMA?si=fUnUZxGHZzad-NZt
9/28/25, 12:43 PM - MD. Jahidul Islam: https://www.facebook.com/reel/1104220858358721
10/2/25, 1:10 AM - MD. Jahidul Islam: https://www.facebook.com/reel/3165950973569276
10/4/25, 8:52 AM - MD. Jahidul Islam: https://www.facebook.com/reel/740816898416576
10/7/25, 2:33 PM - MD. Jahidul Islam: https://youtu.be/Gnug4K8cGvE
11/10/25, 5:54 PM - MD. Jahidul Islam: https://www.facebook.com/reel/2021712455329344
11/13/25, 1:29 AM - MD. Jahidul Islam: https://www.facebook.com/share/r/1CeHtd8srF/
11/13/25, 1:33 AM - MD. Jahidul Islam: https://www.facebook.com/share/r/17fr3uzy5V/
11/14/25, 2:25 AM - MD. Jahidul Islam: https://www.facebook.com/share/v/1D51phggJh/
12/24/25, 11:56 PM - MD. Jahidul Islam: https://youtube.com/shorts/_axtKLz0Q08?si=oOmiW7mYCAcV-Sbl
1/1/26, 4:19 AM - MD. Jahidul Islam: https://www.facebook.com/share/r/17pSaA3PMi/
1/1/26, 4:22 AM - MD. Jahidul Islam: https://www.facebook.com/share/r/1G5T8XBaac/
1/1/26, 4:23 AM - MD. Jahidul Islam: https://www.facebook.com/share/r/1Bt9x3Mqes/
1/1/26, 5:26 AM - MD. Jahidul Islam: https://www.facebook.com/share/r/19Ff9yrCmD/
1/2/26, 4:32 AM - MD. Jahidul Islam: https://www.facebook.com/share/r/1ANPDjpUh8/
1/2/26, 4:36 AM - MD. Jahidul Islam: https://www.facebook.com/share/r/1HBEvmZgNm/
1/2/26, 4:56 AM - MD. Jahidul Islam: https://www.instagram.com/reel/DSvO3lskwpO/?igsh=ZjFkYzMzMDQzZg==
1/7/26, 3:36 AM - MD. Jahidul Islam: https://www.youtube.com/watch?v=yEL5Mn2SkrE
1/24/26, 8:13 PM - MD. Jahidul Islam: https://www.youtube.com/watch?v=9nUlQjvZh2A&list=PL9FuOtXibFjV77w2eyil4Xzp8eooqsPp8&index=3
1/24/26, 8:13 PM - MD. Jahidul Islam: https://www.youtube.com/watch?v=PUhWSut5b3c&list=PL9FuOtXibFjWY-zqhun5kRgXdR_W9cpSB
1/31/26, 12:01 PM - MD. Jahidul Islam: https://www.facebook.com/reel/817214274666411
2/3/26, 12:13 PM - MD. Jahidul Islam: https://www.facebook.com/reel/1304052308148914
2/13/26, 2:52 AM - MD. Jahidul Islam: https://youtu.be/c3KnUpV05LU
2/13/26, 2:52 AM - MD. Jahidul Islam: https://youtu.be/IIuDO8ErVPM
2/17/26, 3:38 AM - MD. Jahidul Islam: https://youtu.be/8lO_GYI8K4o
2/20/26, 5:41 PM - MD. Jahidul Islam: https://www.facebook.com/reel/1086930913531817
2/21/26, 1:41 AM - MD. Jahidul Islam: https://www.facebook.com/reel/1658110828489479
2/23/26, 11:22 AM - MD. Jahidul Islam: https://www.facebook.com/reel/2155542588515472
2/23/26, 11:24 AM - MD. Jahidul Islam: https://www.facebook.com/reel/728401793537295
2/23/26, 11:55 AM - MD. Jahidul Islam: https://www.facebook.com/reel/931276862769589
2/24/26, 10:17 PM - MD. Jahidul Islam: https://youtube.com/shorts/9atESTZ_9iw?si=esCyHqmeqLD-xNtt
2/27/26, 2:20 AM - MD. Jahidul Islam: https://www.facebook.com/reel/1454619106186614
2/28/26, 2:02 AM - MD. Jahidul Islam: https://www.facebook.com/reel/1446578493861606
3/1/26, 1:48 PM - MD. Jahidul Islam: https://www.facebook.com/reel/1431790885128095
3/1/26, 1:52 PM - MD. Jahidul Islam: https://www.facebook.com/reel/1385729183237747
3/2/26, 12:10 AM - MD. Jahidul Islam: https://www.facebook.com/reel/2002722787256141
3/2/26, 12:12 AM - MD. Jahidul Islam: https://www.facebook.com/reel/1270773181776109
3/2/26, 8:39 PM - MD. Jahidul Islam: https://www.facebook.com/reel/25404993085861084
3/3/26, 8:38 PM - MD. Jahidul Islam: https://www.facebook.com/reel/898076062851837
3/3/26, 8:41 PM - MD. Jahidul Islam: https://www.facebook.com/reel/4383612588630558
3/4/26, 12:59 AM - MD. Jahidul Islam: https://www.facebook.com/reel/3800107046964615
3/4/26, 1:00 AM - MD. Jahidul Islam: https://www.facebook.com/reel/1207528184796993
3/7/26, 2:58 AM - MD. Jahidul Islam: https://www.facebook.com/reel/1255070075973623
3/7/26, 3:06 AM - MD. Jahidul Islam: https://www.facebook.com/reel/2362111990881111
3/8/26, 5:45 PM - MD. Jahidul Islam: https://www.facebook.com/reel/1282263667154144
3/9/26, 1:06 AM - MD. Jahidul Islam: https://www.facebook.com/reel/1096106698357759
3/10/26, 7:11 PM - MD. Jahidul Islam: https://www.facebook.com/reel/26622663433986078
3/12/26, 1:29 AM - MD. Jahidul Islam: https://www.facebook.com/reel/924864780037966
3/12/26, 1:40 AM - MD. Jahidul Islam: https://www.facebook.com/reel/1898343457554056
3/12/26, 1:52 AM - MD. Jahidul Islam: https://www.facebook.com/reel/1273805224643063
3/14/26, 5:23 AM - MD. Jahidul Islam: https://youtube.com/shorts/6iz_TMXUQos?si=Lu9n96qqDqW0KCfm
3/15/26, 12:06 AM - MD. Jahidul Islam: https://www.facebook.com/reel/2002737737307241
3/15/26, 12:06 AM - MD. Jahidul Islam: https://www.facebook.com/reel/2877899095893872
3/15/26, 12:13 AM - MD. Jahidul Islam: https://www.facebook.com/reel/923211223905834
3/15/26, 12:17 AM - MD. Jahidul Islam: https://www.facebook.com/reel/946725537774737
3/15/26, 12:17 AM - MD. Jahidul Islam: https://www.facebook.com/reel/899062123123190
3/15/26, 2:42 AM - MD. Jahidul Islam: https://youtu.be/iGeXGdYE7UE
3/15/26, 1:12 PM - MD. Jahidul Islam: https://www.facebook.com/share/r/1bZgX28mQ8/
3/16/26, 1:05 AM - MD. Jahidul Islam: https://www.facebook.com/reel/952964173739468
3/16/26, 1:23 AM - MD. Jahidul Islam: https://www.facebook.com/reel/2330529207426440
3/16/26, 1:34 AM - MD. Jahidul Islam: https://www.facebook.com/reel/1217466273936199
3/16/26, 1:38 AM - MD. Jahidul Islam: https://www.facebook.com/reel/845949848285960
3/16/26, 10:56 AM - MD. Jahidul Islam: https://www.facebook.com/reel/1615430729883444
3/16/26, 11:19 AM - MD. Jahidul Islam: https://www.facebook.com/reel/1716504489319548
3/16/26, 11:20 AM - MD. Jahidul Islam: https://www.facebook.com/reel/1365142742034461
3/16/26, 11:27 AM - MD. Jahidul Islam: https://www.facebook.com/reel/922518050525593
3/16/26, 11:35 AM - MD. Jahidul Islam: https://www.facebook.com/reel/1292357829414203
3/16/26, 11:48 AM - MD. Jahidul Islam: https://www.facebook.com/reel/900938799381466
3/18/26, 5:24 PM - MD. Jahidul Islam: https://www.facebook.com/reel/2165511454190510
3/18/26, 5:37 PM - MD. Jahidul Islam: https://www.facebook.com/reel/1270614084490029
3/18/26, 5:47 PM - MD. Jahidul Islam: https://www.facebook.com/reel/2410432452735749
3/19/26, 1:21 PM - MD. Jahidul Islam: https://www.facebook.com/reel/1325736092729821
3/19/26, 5:24 PM - MD. Jahidul Islam: https://www.facebook.com/reel/1578931123364415
3/19/26, 5:48 PM - MD. Jahidul Islam: https://www.facebook.com/reel/773938828714146
3/19/26, 5:59 PM - MD. Jahidul Islam: https://www.facebook.com/reel/25437409955932563
3/19/26, 6:02 PM - MD. Jahidul Islam: https://www.facebook.com/reel/765933639678358
3/20/26, 7:11 PM - MD. Jahidul Islam: https://www.facebook.com/reel/1234074232222070
3/20/26, 7:33 PM - MD. Jahidul Islam: https://www.facebook.com/reel/2153043218879300
3/20/26, 7:35 PM - MD. Jahidul Islam: https://www.facebook.com/reel/944967057861132
3/20/26, 7:46 PM - MD. Jahidul Islam: https://www.facebook.com/reel/1755475252531170
3/21/26, 2:55 AM - MD. Jahidul Islam: https://www.facebook.com/reel/853482390787278
3/23/26, 12:36 PM - MD. Jahidul Islam: https://www.facebook.com/reel/842690628799023
3/30/26, 2:55 AM - MD. Jahidul Islam: https://www.facebook.com/reel/1473262017668080
4/1/26, 10:11 AM - MD. Jahidul Islam: https://www.facebook.com/reel/890987833980239
4/2/26, 12:49 AM - MD. Jahidul Islam: https://youtube.com/shorts/rw3LOCQC9Ds?si=5NLnn--azyYPiRLb
4/2/26, 1:31 AM - MD. Jahidul Islam: https://www.facebook.com/reel/897924136455791
4/2/26, 11:08 PM - MD. Jahidul Islam: https://www.facebook.com/reel/2055899451623785
4/2/26, 11:10 PM - MD. Jahidul Islam: https://www.facebook.com/reel/2128381531234822
4/2/26, 11:13 PM - MD. Jahidul Islam: https://www.facebook.com/reel/1642705023397453
4/2/26, 11:14 PM - MD. Jahidul Islam: https://www.facebook.com/reel/879913020307161
4/3/26, 12:08 AM - MD. Jahidul Islam: https://www.facebook.com/reel/1256259819962099
4/3/26, 12:37 AM - MD. Jahidul Islam: https://www.facebook.com/reel/1668021244231879
4/3/26, 12:38 AM - MD. Jahidul Islam: https://www.facebook.com/reel/1252303527047407
4/3/26, 11:32 PM - MD. Jahidul Islam: https://www.facebook.com/reel/1453017309854529
4/3/26, 11:41 PM - MD. Jahidul Islam: https://www.facebook.com/reel/1456798342807821
4/3/26, 11:43 PM - MD. Jahidul Islam: https://www.facebook.com/reel/1621231332551505
4/3/26, 11:46 PM - MD. Jahidul Islam: https://www.facebook.com/reel/1552704999282362
4/3/26, 11:55 PM - MD. Jahidul Islam: https://www.facebook.com/reel/1651382716016336
4/4/26, 1:00 PM - MD. Jahidul Islam: https://www.facebook.com/reel/3375660329268536
4/5/26, 12:46 AM - MD. Jahidul Islam: https://www.facebook.com/reel/1606116850699881
4/5/26, 12:47 AM - MD. Jahidul Islam: https://www.facebook.com/reel/739424315910488
4/5/26, 11:30 AM - MD. Jahidul Islam: https://www.facebook.com/reel/1652201735774481
4/5/26, 11:30 AM - MD. Jahidul Islam: https://www.facebook.com/reel/1320238846728000
4/5/26, 12:58 PM - MD. Jahidul Islam: https://www.facebook.com/reel/947513540995640
4/5/26, 12:58 PM - MD. Jahidul Islam: https://www.facebook.com/reel/1255403406798760
4/5/26, 1:25 PM - MD. Jahidul Islam: https://www.facebook.com/reel/1318638196686178
4/6/26, 11:18 AM - MD. Jahidul Islam: https://www.facebook.com/reel/3458076504356698
4/6/26, 11:20 AM - MD. Jahidul Islam: https://www.facebook.com/reel/1510274480707103
4/6/26, 11:29 AM - MD. Jahidul Islam: https://www.facebook.com/reel/2636908463357060
4/6/26, 7:48 PM - MD. Jahidul Islam: https://www.facebook.com/reel/1283067813782665
4/6/26, 7:49 PM - MD. Jahidul Islam: https://www.facebook.com/reel/33875402225439354
4/7/26, 2:56 AM - MD. Jahidul Islam: https://www.facebook.com/reel/810611821434296
4/7/26, 12:36 PM - MD. Jahidul Islam: https://www.facebook.com/reel/1608710573512996
4/7/26, 12:58 PM - MD. Jahidul Islam: https://www.facebook.com/reel/2680417072354551
4/7/26, 1:06 PM - MD. Jahidul Islam: https://www.facebook.com/reel/1651565206038528
4/8/26, 12:04 PM - MD. Jahidul Islam: https://www.facebook.com/reel/1416250252997825
4/8/26, 12:48 PM - MD. Jahidul Islam: https://www.facebook.com/reel/938896965458829
4/8/26, 1:10 PM - MD. Jahidul Islam: https://www.facebook.com/reel/2177234526380567
4/14/26, 5:26 PM - MD. Jahidul Islam: https://www.facebook.com/share/r/18YDVMqU2B/
4/14/26, 5:36 PM - MD. Jahidul Islam: https://www.facebook.com/share/r/1JD5yfv98z/
4/14/26, 11:11 PM - MD. Jahidul Islam: https://www.facebook.com/reel/906348015547314
4/14/26, 11:22 PM - MD. Jahidul Islam: https://www.facebook.com/reel/1149898567294528
4/15/26, 1:59 AM - MD. Jahidul Islam: https://www.facebook.com/reel/955735520376190
4/16/26, 2:53 AM - MD. Jahidul Islam: https://www.facebook.com/reel/2729633734075892
4/16/26, 5:38 AM - MD. Jahidul Islam: https://youtube.com/shorts/VInrvSc09qU?si=K-RvSKDhDgfkEqT5
4/17/26, 7:38 PM - MD. Jahidul Islam: https://www.facebook.com/reel/2703264343366147
4/17/26, 7:57 PM - MD. Jahidul Islam: https://www.facebook.com/reel/1623898465476761
4/18/26, 12:43 PM - MD. Jahidul Islam: https://www.facebook.com/reel/3291736057667345
4/18/26, 12:46 PM - MD. Jahidul Islam: https://www.facebook.com/reel/919059364311561
4/19/26, 12:31 PM - MD. Jahidul Islam: https://www.instagram.com/reel/DXJ6lKhjvSj/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ==
4/19/26, 12:34 PM - MD. Jahidul Islam: https://www.instagram.com/reel/DWlrC88Db2r/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ==
4/20/26, 1:14 AM - MD. Jahidul Islam: https://www.facebook.com/reel/1257999689539327
4/20/26, 1:22 AM - MD. Jahidul Islam: https://www.facebook.com/reel/960193683160248
4/20/26, 1:38 AM - MD. Jahidul Islam: https://www.facebook.com/reel/1872536809951286
4/20/26, 7:21 PM - MD. Jahidul Islam: https://www.facebook.com/reel/1462356008948417
4/21/26, 2:22 PM - MD. Jahidul Islam: https://www.facebook.com/reel/1685720802608417
4/21/26, 7:27 PM - MD. Jahidul Islam: https://www.facebook.com/reel/2503410170075560
4/23/26, 10:26 PM - MD. Jahidul Islam: https://www.facebook.com/reel/914059654770574
4/23/26, 10:27 PM - MD. Jahidul Islam: https://www.facebook.com/reel/1255168690165560
4/24/26, 4:10 AM - MD. Jahidul Islam: https://www.facebook.com/share/r/18mXRBP9Ve/
4/25/26, 1:19 AM - MD. Jahidul Islam: https://www.facebook.com/reel/2414412238990214
4/25/26, 11:33 PM - MD. Jahidul Islam: https://www.facebook.com/reel/978584398441849
4/25/26, 11:43 PM - MD. Jahidul Islam: https://www.instagram.com/reel/DWWUoS0Dd60/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ==
4/25/26, 11:49 PM - MD. Jahidul Islam: https://www.instagram.com/reel/DXJz7YPjSEe/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ==
4/28/26, 3:25 AM - MD. Jahidul Islam: https://youtube.com/shorts/N9vB2tgQb1E?si=-MC53-2qyFLiyfHf
4/28/26, 12:24 PM - MD. Jahidul Islam: https://youtu.be/Y4WZKDQWfNA?si=ilb2JzUpN2oTSpQh
4/28/26, 10:53 PM - MD. Jahidul Islam: https://www.youtube.com/watch?v=jHqYdZCb6eY
4/28/26, 10:54 PM - MD. Jahidul Islam: https://www.youtube.com/watch?v=7nSQdhv95XQ
4/28/26, 11:09 PM - MD. Jahidul Islam: https://www.facebook.com/reel/1436267357989291
4/29/26, 12:29 AM - MD. Jahidul Islam: https://www.facebook.com/reel/27316305874637665
4/29/26, 9:18 PM - MD. Jahidul Islam: https://www.facebook.com/reel/1553652012823064
4/30/26, 3:11 AM - MD. Jahidul Islam: https://www.facebook.com/reel/1671127254015834
4/30/26, 4:31 AM - MD. Jahidul Islam: https://youtube.com/shorts/vcJIX9PRENw?si=BPVuqQP7Q0WQCh4j
5/3/26, 2:04 PM - MD. Jahidul Islam: https://www.facebook.com/reel/27092074920388311
5/3/26, 4:55 PM - MD. Jahidul Islam: https://youtube.com/shorts/GK7-KE2QeOE?si=2S3cgQcf5cr7syx1
5/10/26, 2:26 PM - MD. Jahidul Islam: https://www.facebook.com/reel/2155312071702547
5/14/26, 12:30 PM - MD. Jahidul Islam: https://www.facebook.com/reel/2336588260081963
5/14/26, 1:04 PM - MD. Jahidul Islam: https://www.facebook.com/reel/988314080327229
5/14/26, 2:11 PM - MD. Jahidul Islam: https://www.facebook.com/reel/1666621364536750
5/15/26, 12:34 AM - MD. Jahidul Islam: https://www.facebook.com/reel/744450482026967
5/15/26, 4:47 AM - MD. Jahidul Islam: https://www.facebook.com/reel/1975803826611779
5/17/26, 11:39 AM - MD. Jahidul Islam: https://www.facebook.com/share/r/1E515FgjDt/
5/17/26, 11:53 AM - MD. Jahidul Islam: https://www.instagram.com/reel/DYHwqz3MWhf/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ==
5/17/26, 12:10 PM - MD. Jahidul Islam: https://www.instagram.com/reel/DYaYbYlMgcw/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ==
5/19/26, 2:01 PM - MD. Jahidul Islam: https://www.facebook.com/reel/945738261695318
5/19/26, 2:02 PM - MD. Jahidul Islam: https://www.facebook.com/reel/1652176272892746
5/20/26, 12:40 PM - MD. Jahidul Islam: https://youtu.be/prx1psByp7U?si=dCDH7crEnoUx8Pi6
5/20/26, 12:42 PM - MD. Jahidul Islam: https://youtu.be/bTBra0OJ3fo?si=t0TSSEmtmrTt9rI6
5/20/26, 12:42 PM - MD. Jahidul Islam: https://youtu.be/wd0bj7E8Tq0?si=kgnjGjvEvOHex9jn
5/20/26, 1:10 PM - MD. Jahidul Islam: https://youtu.be/0m_YW1zVs-Q?si=fX2WV4IECTG0sETt
5/22/26, 3:24 AM - MD. Jahidul Islam: https://youtube.com/shorts/N6MiqZwIOMA?si=PitCSLfle6j9eWmV
5/25/26, 4:01 AM - MD. Jahidul Islam: https://www.facebook.com/share/r/1EBdgiK7hs/
5/25/26, 5:01 AM - MD. Jahidul Islam: https://www.facebook.com/share/r/1HEe8TPKsb/
5/27/26, 4:41 AM - MD. Jahidul Islam: https://www.facebook.com/share/r/18y1Ee3wPa/
5/29/26, 9:03 PM - MD. Jahidul Islam: https://www.facebook.com/reel/755231520948783
5/29/26, 9:12 PM - MD. Jahidul Islam: https://www.facebook.com/reel/930728169729996
5/29/26, 9:31 PM - MD. Jahidul Islam: https://www.facebook.com/reel/1611212769948492
5/30/26, 9:29 PM - MD. Jahidul Islam: https://www.facebook.com/share/r/1BggoXQXpz/
6/1/26, 3:11 PM - MD. Jahidul Islam: https://www.facebook.com/reel/27450675377851208
6/6/26, 11:31 PM - MD. Jahidul Islam: https://www.instagram.com/reel/DY_HsiXuR8E/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ==
6/7/26, 3:54 AM - MD. Jahidul Islam: https://www.facebook.com/reel/2868144853524905
6/12/26, 12:13 PM - MD. Jahidul Islam: https://www.instagram.com/reel/DZeMI6upTy3/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ==
6/12/26, 12:17 PM - MD. Jahidul Islam: https://www.instagram.com/reel/DYtJmUQtL4r/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ==
6/12/26, 12:22 PM - MD. Jahidul Islam: https://www.instagram.com/reel/DYNW3X7J2TH/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ==
6/12/26, 12:26 PM - MD. Jahidul Islam: https://www.instagram.com/reel/DX-GNTnTEeF/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ==
6/13/26, 1:33 PM - MD. Jahidul Islam: https://www.instagram.com/reel/DYfWwghzT8S/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ==
6/14/26, 11:40 AM - MD. Jahidul Islam: https://www.facebook.com/reel/1341870367897622
6/14/26, 11:45 AM - MD. Jahidul Islam: https://www.facebook.com/reel/1477701604097302
6/14/26, 1:57 PM - MD. Jahidul Islam: https://www.instagram.com/p/DZVrWEeCas0/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ==
6/18/26, 10:58 PM - MD. Jahidul Islam: https://www.instagram.com/reel/DXQq4x-IiHT/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ==
6/18/26, 11:02 PM - MD. Jahidul Islam: https://www.instagram.com/reel/DZVJKoOSEez/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ==
6/18/26, 11:11 PM - MD. Jahidul Islam: https://www.instagram.com/reel/DZVxhkDTBAK/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ==
6/18/26, 11:22 PM - MD. Jahidul Islam: https://www.instagram.com/reel/DW7qTbfMn9G/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ==
6/18/26, 11:24 PM - MD. Jahidul Islam: https://www.instagram.com/reel/DXrOX-Ck89J/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ==
6/18/26, 11:58 PM - MD. Jahidul Islam: https://www.facebook.com/reel/1523032602466387
6/20/26, 12:47 AM - MD. Jahidul Islam: https://www.facebook.com/reel/1665461071249889
6/21/26, 2:18 AM - MD. Jahidul Islam: https://www.instagram.com/reel/DXtsRWQE7MC/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ==
6/21/26, 2:52 AM - MD. Jahidul Islam: https://www.instagram.com/reel/DYUlhtSxlbp/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==
6/22/26, 2:21 AM - MD. Jahidul Islam: https://youtu.be/lrmE-WiC4eA
6/23/26, 1:22 PM - MD. Jahidul Islam: https://www.facebook.com/reel/947498627870566
6/26/26, 1:55 AM - MD. Jahidul Islam: https://www.instagram.com/jpnguru/
6/26/26, 5:39 AM - MD. Jahidul Islam: https://www.instagram.com/reel/DZ-hhvPAPGj/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ==
6/26/26, 7:31 PM - MD. Jahidul Islam: https://www.facebook.com/reel/1238701111412231
6/26/26, 11:25 PM - MD. Jahidul Islam: https://www.facebook.com/reel/1499910064832606
6/27/26, 1:49 AM - MD. Jahidul Islam: https://www.instagram.com/reel/DaAyPpME756/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ==
6/27/26, 1:57 AM - MD. Jahidul Islam: https://www.instagram.com/reel/DYZ5dDLO-VV/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ==
6/27/26, 2:00 AM - MD. Jahidul Islam: https://www.instagram.com/reel/DW7CIA4kVcj/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ==
6/28/26, 12:52 PM - MD. Jahidul Islam: https://www.facebook.com/reel/2351486355375495
7/3/26, 7:35 PM - MD. Jahidul Islam: https://www.facebook.com/reel/1759735788530256
7/3/26, 9:39 PM - MD. Jahidul Islam: https://www.facebook.com/share/r/1JAi7MbLMD/
7/13/26, 12:56 PM - MD. Jahidul Islam: https://www.facebook.com/reel/946598248418077
7/13/26, 1:20 PM - MD. Jahidul Islam: https://www.facebook.com/reel/3439444026233914
7/13/26, 1:22 PM - MD. Jahidul Islam: https://www.facebook.com/reel/1450987183460325
7/13/26, 1:24 PM - MD. Jahidul Islam: https://www.facebook.com/reel/1912210862801145
7/13/26, 1:36 PM - MD. Jahidul Islam: https://www.facebook.com/reel/994657010219938
7/13/26, 1:47 PM - MD. Jahidul Islam: https://www.facebook.com/reel/1813527479618562
7/21/26, 1:49 AM - MD. Jahidul Islam: https://www.facebook.com/reel/998159743124526
7/21/26, 1:20 PM - MD. Jahidul Islam: https://www.facebook.com/reel/1400213268687146
7/22/26, 9:08 PM - MD. Jahidul Islam: https://www.facebook.com/reel/4439379599712452
7/25/26, 9:32 PM - MD. Jahidul Islam: https://www.facebook.com/reel/1411838590798996
7/25/26, 9:38 PM - MD. Jahidul Islam: https://www.facebook.com/reel/1059552039829622
7/25/26, 9:51 PM - MD. Jahidul Islam: https://www.facebook.com/reel/1381465420573617
7/26/26, 12:35 PM - MD. Jahidul Islam: https://www.instagram.com/reel/Daql4uwSYK0/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ==
7/27/26, 12:55 PM - MD. Jahidul Islam: https://www.facebook.com/reel/1363310432421660
7/27/26, 1:00 PM - MD. Jahidul Islam: https://www.facebook.com/reel/1791589832195312
7/27/26, 1:02 PM - MD. Jahidul Islam: https://www.facebook.com/reel/1025546606935859
7/29/26, 2:25 AM - MD. Jahidul Islam: https://youtu.be/zHnqyMGAiXk
7/30/26, 2:57 AM - MD. Jahidul Islam: https://youtu.be/2TTpnYxH-pM?t=1489
7/30/26, 10:10 PM - MD. Jahidul Islam: https://www.facebook.com/share/r/1BkP8gKvYk/
7/30/26, 10:36 PM - MD. Jahidul Islam: https://www.instagram.com/reel/DbZTN49ugmI/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ==
7/30/26, 11:20 PM - MD. Jahidul Islam: https://www.instagram.com/reel/DZ_MK0HwalZ/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ==
7/31/26, 10:01 PM - MD. Jahidul Islam: https://www.facebook.com/reel/4606372399619759
8/1/26, 1:22 PM - MD. Jahidul Islam: https://www.facebook.com/share/r/1FoC751CY2/
8/2/26, 12:50 PM - MD. Jahidul Islam: https://www.facebook.com/reel/1758181335376517
8/2/26, 8:56 PM - MD. Jahidul Islam: https://www.facebook.com/reel/1795793868075722
8/2/26, 8:56 PM - MD. Jahidul Islam: https://www.facebook.com/reel/823104464126091
8/3/26, 4:25 AM - MD. Jahidul Islam: https://www.facebook.com/share/r/1BYmuCYNzj/
8/3/26, 5:02 AM - MD. Jahidul Islam: https://www.facebook.com/share/r/19GEwmGzeR/
8/4/26, 1:58 PM - MD. Jahidul Islam: https://www.facebook.com/reel/3709770639177169
8/4/26, 1:59 PM - MD. Jahidul Islam: https://www.facebook.com/reel/1701198167661361
8/4/26, 2:02 PM - MD. Jahidul Islam: https://www.facebook.com/reel/1451357896799164
8/4/26, 10:55 PM - MD. Jahidul Islam: https://www.instagram.com/reel/Da70dE8qqKT/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ==
8/5/26, 3:07 AM - MD. Jahidul Islam: https://www.facebook.com/share/v/1BAyri8ZUJ/
8/5/26, 3:12 AM - MD. Jahidul Islam: https://www.facebook.com/share/v/1PPFbeyXKz/
8/5/26, 1:31 PM - MD. Jahidul Islam: https://www.instagram.com/reel/DafvgNgICSa/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ==
8/5/26, 1:42 PM - MD. Jahidul Islam: https://www.instagram.com/reels/DbmtbukTduy/
8/6/26, 6:37 PM - MD. Jahidul Islam: https://www.facebook.com/share/r/1Q845gq6A5/
8/6/26, 6:37 PM - MD. Jahidul Islam: https://www.facebook.com/share/r/1FCivg8GZN/
8/6/26, 7:16 PM - MD. Jahidul Islam: https://www.facebook.com/share/r/19CDTYhMTt/
8/7/26, 3:01 AM - MD. Jahidul Islam: https://youtu.be/s1T4R-wNPoc?list=PLAl_ntaM9CE9rGuSLFPs4N7f4MYuz8NA2
8/7/26, 10:31 AM - MD. Jahidul Islam: https://www.facebook.com/share/r/1Cmwue1T1K/
8/7/26, 10:38 AM - MD. Jahidul Islam: https://www.facebook.com/share/r/1BL263K4Pf/
8/7/26, 10:45 AM - MD. Jahidul Islam: https://www.facebook.com/share/v/19Md2UKQCc/
8/7/26, 10:48 AM - MD. Jahidul Islam: https://www.facebook.com/share/r/1ckQs6nFdD/
8/8/26, 1:29 PM - MD. Jahidul Islam: https://www.facebook.com/reel/1912210862801145
8/8/26, 1:34 PM - MD. Jahidul Islam: https://www.facebook.com/reel/1061228556857737
8/10/26, 3:46 AM - MD. Jahidul Islam: https://www.facebook.com/share/r/1E5RwDgBcz/
8/10/26, 1:03 PM - MD. Jahidul Islam: https://www.facebook.com/reel/2085668025656429
8/10/26, 11:08 PM - MD. Jahidul Islam: https://www.instagram.com/reel/Db2tzOVhcsR/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ==
8/12/26, 8:23 PM - MD. Jahidul Islam: https://www.instagram.com/reel/DavN_06t105/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ==
8/12/26, 8:45 PM - MD. Jahidul Islam: https://www.instagram.com/reel/DbV7Mxoj0rh/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ==
8/13/26, 1:57 PM - MD. Jahidul Islam: https://www.facebook.com/share/r/1C6aWryruk/
8/13/26, 2:07 PM - MD. Jahidul Islam: https://www.facebook.com/reel/1080748338229038
8/13/26, 2:42 PM - MD. Jahidul Islam: https://youtu.be/yRJBZrlT2kw
8/16/26, 3:39 AM - MD. Jahidul Islam: https://www.facebook.com/share/r/1JAwTjffaX/
8/20/26, 8:48 PM - MD. Jahidul Islam: https://www.instagram.com/reel/Db3TRmqIewv/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==
8/27/26, 2:46 AM - MD. Jahidul Islam: https://youtu.be/HMfA-FtYWMI
8/31/26, 3:04 PM - MD. Jahidul Islam: https://youtu.be/VwWbGHHHVIQ
9/2/26, 2:23 PM - MD. Jahidul Islam: https://www.facebook.com/reel/768184319135217
9/3/26, 2:12 AM - MD. Jahidul Islam: https://youtu.be/N__uYg18pUA?t=3476
9/3/26, 2:14 PM - MD. Jahidul Islam: https://www.facebook.com/share/v/1BYiGss6sK/
9/3/26, 9:43 PM - MD. Jahidul Islam: https://youtube.com/shorts/GD0tqRdxFjk?si=MMRjMKxYl73mllcE
9/4/26, 10:52 PM - MD. Jahidul Islam: https://www.facebook.com/reel/1590216249148153
9/5/26, 1:14 PM - MD. Jahidul Islam: https://www.facebook.com/reel/1410633901016148
9/5/26, 1:36 PM - MD. Jahidul Islam: https://www.facebook.com/share/r/1DguR8nsWd/
9/11/26, 9:58 PM - MD. Jahidul Islam: https://www.facebook.com/reel/2030467910932600
9/18/26, 1:19 AM - MD. Jahidul Islam: https://www.facebook.com/reel/1382150664003687
9/18/26, 1:22 AM - MD. Jahidul Islam: https://www.facebook.com/reel/1323943849837711
9/18/26, 1:58 AM - MD. Jahidul Islam: https://youtu.be/nSO2guItytg?si=FFood7uCixTOh5iI
9/21/26, 12:22 PM - MD. Jahidul Islam: https://www.instagram.com/reel/Ddg3yiFRtMg/?utm_source=ig_web_copy_link&stkn=NTc4MTIwNjQ2YQ==
9/21/26, 4:24 PM - MD. Jahidul Islam: https://www.facebook.com/share/r/1MGmCPpZwQ/
9/21/26, 4:43 PM - MD. Jahidul Islam: https://www.facebook.com/share/r/1DAfkSfLNn/
9/21/26, 5:11 PM - MD. Jahidul Islam: https://www.instagram.com/reel/DdEea0wiU1_/?stkn=djZwaTJlZmw2Yms5
9/21/26, 5:12 PM - MD. Jahidul Islam: https://www.instagram.com/reel/Ddh7I_ks3C0/?stkn=MXR1amtrOGsxN29ldA==
9/23/26, 9:15 PM - MD. Jahidul Islam: https://www.facebook.com/share/r/1Bye2Vrid7/
9/23/26, 9:34 PM - MD. Jahidul Islam: https://www.facebook.com/share/r/1FFcdmA4GY/
9/23/26, 9:38 PM - MD. Jahidul Islam: https://www.facebook.com/share/v/1TiPVezhFT/
9/23/26, 9:40 PM - MD. Jahidul Islam: https://www.facebook.com/share/r/1DCqcxH2ZQ/
9/26/26, 3:20 AM - MD. Jahidul Islam: https://www.instagram.com/reel/Ddr1pIppVde/?stkn=MTlzYWFnbXZmc2ltag==
9/26/26, 3:21 AM - MD. Jahidul Islam: https://www.instagram.com/reel/Dds5AIvvPBk/?stkn=MW0zcmo4aHV1eWlzbQ==
9/26/26, 3:24 AM - MD. Jahidul Islam: https://www.instagram.com/reel/Da5be6dJ6Fi/?stkn=MWp0YW14bXVxZHp0OA==
9/27/26, 11:12 PM - MD. Jahidul Islam: https://www.facebook.com/share/v/19nHY4ovFY/
9/28/26, 3:10 AM - MD. Jahidul Islam: https://www.facebook.com/share/r/1BshYzyTBi/
9/28/26, 2:08 PM - MD. Jahidul Islam: https://www.facebook.com/share/r/1JWSrVwP7j/
9/28/26, 2:09 PM - MD. Jahidul Islam: https://www.facebook.com/reel/1053389784362164
9/29/26, 11:38 PM - MD. Jahidul Islam: https://www.facebook.com/share/v/1En5LFyZag/
9/30/26, 3:04 AM - MD. Jahidul Islam: https://www.youtube.com/watch?v=s9w3gtgvNSU
9/30/26, 11:38 PM - MD. Jahidul Islam: https://www.facebook.com/share/1C6GjB11TG/
10/1/26, 3:05 AM - MD. Jahidul Islam: https://www.facebook.com/share/r/14qa9U2QgaE/
10/1/26, 11:41 AM - MD. Jahidul Islam: https://www.facebook.com/share/r/1ERXwxihCJ/
10/6/26, 9:20 PM - MD. Jahidul Islam: https://www.facebook.com/reel/1126695196395659
10/7/26, 3:21 AM - MD. Jahidul Islam: https://www.facebook.com/reel/2230079151015886?sfnsn=wa&mibextid=6AJuK9
10/7/26, 3:21 AM - MD. Jahidul Islam: https://www.facebook.com/reel/776281488881600?sfnsn=wa&mibextid=6AJuK9
10/7/26, 3:27 AM - MD. Jahidul Islam: https://www.facebook.com/reel/2898844373830267?sfnsn=wa&mibextid=6AJuK9
10/7/26, 3:29 AM - MD. Jahidul Islam: https://www.facebook.com/reel/2249406302265382?sfnsn=wa&mibextid=6AJuK9
10/7/26, 3:37 AM - MD. Jahidul Islam: https://www.facebook.com/reel/1588489179723646?sfnsn=wa&mibextid=6AJuK9
10/7/26, 4:42 AM - MD. Jahidul Islam: https://www.facebook.com/share/r/1KcVp7VRnK/
10/10/26, 12:14 AM - MD. Jahidul Islam: https://www.facebook.com/share/v/16FNhmUW24n/
10/10/26, 4:18 PM - MD. Jahidul Islam: https://www.instagram.com/reel/DYPkiu2JR98/?rpxt=dXhmaW40OGVrbnAy
10/10/26, 5:01 PM - MD. Jahidul Islam: https://www.facebook.com/share/r/17jjsqUgs5/
10/11/26, 4:34 AM - MD. Jahidul Islam: https://www.facebook.com/share/r/1CvLQqAPiZ/
10/11/26, 4:37 AM - MD. Jahidul Islam: https://www.facebook.com/share/r/1CRB3ttsos/
10/11/26, 7:23 PM - MD. Jahidul Islam: https://www.facebook.com/share/r/19qYYLdv7A/
10/11/26, 7:55 PM - MD. Jahidul Islam: https://www.facebook.com/share/r/1ExeY5uoKX/
10/12/26, 2:28 AM - MD. Jahidul Islam: https://www.facebook.com/share/r/19bWeswRq8/
10/12/26, 4:30 AM - MD. Jahidul Islam: https://www.instagram.com/reel/DbLPUsLvoaQ/?mdxt=MTd3eHlwNHJvanRnbg==
10/14/26, 1:21 PM - MD. Jahidul Islam: https://www.youtube.com/watch?v=sboMG-QTDAg&list=PL6H0G0vU2K2RTZiNOukAxG3Gzu6NYgt19&index=4
10/14/26, 10:06 PM - MD. Jahidul Islam: https://www.facebook.com/share/r/1C8zP8ZNcQ/
10/16/26, 2:54 AM - MD. Jahidul Islam: https://www.facebook.com/share/r/19iVYuQE2B/
10/17/26, 12:49 AM - MD. Jahidul Islam: See this Instagram post by @aevytvdaily: https://www.instagram.com/reel/Dd1uWlZPnOj/?vrfl=YzAyMDM1MGJkZA==`;

const lines = rawText.split('\n');
const items = [];
const seenUrls = new Set();

lines.forEach((line, index) => {
  const urlMatch = line.match(/(https?:\/\/[^\s]+)/);
  if (!urlMatch) return;
  const url = urlMatch[0];
  if (seenUrls.has(url)) return;
  seenUrls.add(url);

  const dateMatch = line.match(/^(\d{1,2}\/\d{1,2}\/\d{2,4},\s*\d{1,2}:\d{2}\s*(?:AM|PM))/i);
  const date = dateMatch ? dateMatch[1] : '';

  let platform = 'other';
  let embedUrl = '';
  let cleanId = '';
  let title = '';

  if (url.includes('instagram.com/reel/') || url.includes('instagram.com/p/') || url.includes('instagram.com/reels/')) {
    platform = 'instagram';
    const match = url.match(/instagram\.com\/(?:reel|reels|p)\/([A-Za-z0-9_-]+)/);
    if (match) {
      cleanId = match[1];
      embedUrl = `https://www.instagram.com/reel/${cleanId}/embed`;
      title = `Instagram Reel (${cleanId})`;
    }
  } else if (url.includes('facebook.com')) {
    platform = 'facebook';
    const reelMatch = url.match(/facebook\.com\/reel\/(\d+)/);
    if (reelMatch) {
      cleanId = reelMatch[1];
      title = `Facebook Reel #${cleanId.slice(-6)}`;
      embedUrl = `https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F${cleanId}%2F&show_text=false&width=267`;
    } else {
      const shareMatch = url.match(/facebook\.com\/(?:share\/[rv]\/|share\/)([A-Za-z0-9]+)/);
      cleanId = shareMatch ? shareMatch[1] : `fb-${index}`;
      title = `Facebook Video (${cleanId})`;
      embedUrl = `https://www.facebook.com/plugins/video.php?height=476&href=${encodeURIComponent(url)}&show_text=false&width=267`;
    }
  } else if (url.includes('youtube.com') || url.includes('youtu.be')) {
    platform = 'youtube';
    let ytId = '';
    const shortsMatch = url.match(/youtube\.com\/shorts\/([A-Za-z0-9_-]+)/);
    const watchMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]+)/);
    if (shortsMatch) {
      ytId = shortsMatch[1];
      title = `YouTube Short (${ytId})`;
    } else if (watchMatch) {
      ytId = watchMatch[1];
      title = `YouTube Video (${ytId})`;
    }
    cleanId = ytId;
    embedUrl = `https://www.youtube.com/embed/${ytId}?enablejsapi=1&autoplay=0&mute=1&loop=1&playlist=${ytId}`;
  }

  if (platform !== 'other') {
    items.push({
      id: `reel-${items.length + 1}`,
      originalUrl: url,
      embedUrl,
      platform,
      code: cleanId,
      title,
      date,
      caption: line.replace(/https?:\/\/[^\s]+/, '').replace(/^.*-\s*MD\.\s*Jahidul Islam:\s*/, '').trim()
    });
  }
});

fs.writeFileSync('src/reelsData.json', JSON.stringify(items, null, 2));
console.log(`Extracted ${items.length} reels items successfully.`);
