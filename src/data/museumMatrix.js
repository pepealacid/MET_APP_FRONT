const museumMatrix = [
    {
        vertex: "Entrance",
        connexions: [
            "The Great Hall"
        ]
    },
    {
        vertex: 981,
        connexions: [
            980, 132
        ]
    },
    {
        vertex: 980,
        connexions: [
            981
        ]
    },
    {
        vertex: 115,
        connexions: [
            116, 111
        ]
    },
    {
        vertex: 111,
        connexions: [
            115, 114, 113, 110, 112
        ]
    },
    {
        vertex: 110,
        connexions: [
            111, 108
        ]
    },
    {
        vertex: 105,
        connexions: [
            106, 107
        ]
    },
    {
        vertex: 106,
        connexions: [
            106
        ]
    },
    {
        vertex: 116,
        connexions: [
            115, 117, 118
        ]
    },
    {
        vertex: 118,
        connexions: [
            116, 119
        ]
    },
    {
        vertex: 119,
        connexions: [
            118, 121, 120
        ]
    },
    {
        vertex: 117,
        connexions: [
            116
        ]
    },
    {
        vertex: 114,
        connexions: [
            111, 109
        ]
    },
    {
        vertex: 113,
        connexions: [
            111
        ]
    },
    {
        vertex: 112,
        connexions: [
            111
        ]
    },
    {
        vertex: 108,
        connexions: [
            109, 107, 110
        ]
    },
    {
        vertex: 109,
        connexions: [
            108, 114
        ]
    },
    {
        vertex: 121,
        connexions: [
            119, 122, 123, 130
        ]
    },
    {
        vertex: 122,
        connexions: [
            121
        ]
    },
    {
        vertex: 123,
        connexions: [
            128, 127, 126, 124, 130
        ]
    },
    {
        vertex: 127,
        connexions: [
            123
        ]
    },
    {
        vertex: 124,
        connexions: [
            123
        ]
    },
    {
        vertex: 126,
        connexions: [
            123
        ]
    },
    {
        vertex: 128,
        connexions: [
            129, 123, 132, 133
        ]
    },
    {
        vertex: 132,
        connexions: [
            128, 107, 981
        ]
    },
    {
        vertex: 107,
        connexions: [
            108, 132, 104, 105
        ]
    },
    {
        vertex: 104,
        connexions: [
            105, 107, 103
        ]
    },
    {
        vertex: 103,
        connexions: [
            104, 136, 101, 102
        ]
    },
    {
        vertex: 101,
        connexions: [
            138, 103
        ]
    },
    {
        vertex: 102,
        connexions: [
            103
        ]
    },
    {
        vertex: 138,
        connexions: [
            101, 137
        ]
    },
    {
        vertex: 137,
        connexions: [
            138, 135
        ]
    },
    {
        vertex: 135,
        connexions: [
            137, 134,
            136, "Grace Rainey Rogers Auditorium"
        ]
    },
    {
        vertex: 136,
        connexions: [
            135, 103
        ]
    },
    {
        vertex: 134,
        connexions: [
            135, 133
        ]
    },
    {
        vertex: 133,
        connexions: [
            134, 128
        ]
    },
    {
        vertex: 120,
        connexions: [
            119
        ]
    },

    {
        vertex: "The Great Hall",
        connexions: [
            138, "Entrance",
            101, 300,
            301, 150
        ]
    },
    {
        vertex: "Grace Rainey Rogers Auditorium",
        connexions: [
            135
        ]
    },
    {
        vertex: 129,
        connexions: [
            130
        ]
    },
    {
        vertex: 130,
        connexions: [
            131, 129, 131
        ]
    },
    {
        vertex: 131,
        connexions: [
            130, 121, 702
        ]
    },
    {
        vertex: 372,
        connexions: [
            376, 371,
            379, 380,
        ]
    },
    {
        vertex: 376,
        connexions: [
            372, 375
        ]
    },
    {
        vertex: 375,
        connexions: [
            371, 376, 374
        ]
    },
    {
        vertex: 374,
        connexions: [
            371, 702
        ]
    },
    {
        vertex: 373,
        connexions: [
            374, 370, 371
        ]
    },
    {
        vertex: 370,
        connexions: [
            503, 377,
            371, 373
        ]
    },
    {
        vertex: 377,
        connexions: [
            370, 371, 378
        ]
    },
    {
        vertex: 378,
        connexions: [
            377, 371, 379
        ]
    },
    {
        vertex: 379,
        connexions: [
            371, 378
        ]
    },
    {
        vertex: 371,
        connexions: [
            372, 375,
            374, 373,
            370, 377, 378
        ]
    },
    {
        vertex: 380,
        connexions: [
            372
        ]
    },
    {
        vertex: 503,
        connexions: [
            500, 502,
            504, 505,
            506, 370
        ]
    },
    {
        vertex: 505,
        connexions: [
            503
        ]
    },
    {
        vertex: 504,
        connexions: [
            503
        ]
    },
    {
        vertex: 502,
        connexions: [
            503, 500
        ]
    },
    {
        vertex: 500,
        connexions: [
            503, 502,
            501, 304
        ]
    },
    {
        vertex: 501,
        connexions: [
            500
        ]
    },
    {
        vertex: 508,
        connexions: [
            307, 506
        ]
    },
    {
        vertex: 506,
        connexions: [
            503, 508,
            507
        ]
    },
    {
        vertex: 507,
        connexions: [
            506
        ]
    },
    {
        vertex: 702,
        connexions: [
            131, 731,
            374, 730,
            700, 701,
            307
        ]
    },
    {
        vertex: 734,
        connexions: [
            732
        ]
    },
    {
        vertex: 732,
        connexions: [
            735, 731,
            733, 735,
            734
        ]
    },
    {
        vertex: 733,
        connexions: [
            732
        ]
    },
    {
        vertex: 735,
        connexions: [
            732, 736
        ]
    },
    {
        vertex: 731,
        connexions: [
            732, 702,
            "746 North"
        ]
    },
    {
        vertex: "746 South",
        connexions: [
            "746 North",
            743, 744
        ]
    },
    {
        vertex: "746 North",
        connexions: [
            731, "746 South"
        ]
    },
    {
        vertex: 744,
        connexions: [
            700, 745,
            "746 South"
        ]
    },
    {
        vertex: 745,
        connexions: [
            744
        ]
    },
    {
        vertex: 743,
        connexions: [
            "746 South",
            744, 742, 744,
            740, 741
        ]
    },
    {
        vertex: 742,
        connexions: [
            733
        ]
    },
    {
        vertex: 739,
        connexions: [
            736
        ]
    },
    {
        vertex: 738,
        connexions: [
            736
        ]
    },
    {
        vertex: 736,
        connexions: [
            743, 737,
            738, 739
        ]
    },
    {
        vertex: 737,
        connexions: [
            736
        ]
    },
    {
        vertex: 741,
        connexions: [
            743
        ]
    },
    {
        vertex: 740,
        connexions: [
            743
        ]
    },
    {
        vertex: 700,
        connexions: [
            701, 702, 744
        ]
    },
    {
        vertex: 730,
        connexions: [
            702, 723
        ]
    },
    {
        vertex: 729,
        connexions: [
            723, 728
        ]
    },
    {
        vertex: 723,
        connexions: [
            729, 730,
            724, 726, 744
        ]
    },
    {
        vertex: 724,
        connexions: [
            723, 725
        ]
    },
    {
        vertex: 725,
        connexions: [
            724, 726
        ]
    },
    {
        vertex: 726,
        connexions: [
            725, 723,
            727, 731
        ]
    },
    {
        vertex: 727,
        connexions: [
            726, 728
        ]
    },
    {
        vertex: 728,
        connexions: [
            729, 727
        ]
    },
    {
        vertex: 701,
        connexions: [
            702, 700,
            307
        ]
    },
    {
        vertex: 307,
        connexions: [
            516, 306,
            508, 702
        ]
    },
    {
        vertex: 306,
        connexions: [
            307, 305
        ]
    },
    {
        vertex: 516,
        connexions: [
            307, 512
        ]
    },
    {
        vertex: 512,
        connexions: [
            516, 513,
            515, 510
        ]
    },
    {
        vertex: 515,
        connexions: [
            512
        ]
    },
    {
        vertex: 514,
        connexions: [
            513
        ]
    },
    {
        vertex: 513,
        connexions: [
            514, 510
        ]
    },
    {
        vertex: 511,
        connexions: [
            521, 510
        ]
    },
    {
        vertex: 510,
        connexions: [
            511, 512,
            509
        ]
    },
    {
        vertex: 509,
        connexions: [
            510, 305
        ]
    },
    {
        vertex: 521,
        connexions: [
            520, 951,
            962, 511
        ]
    },
    {
        vertex: 962,
        connexions: [
            951, 950,
            955, 960,
            959
        ]
    },
    {
        vertex: 951,
        connexions: [
            951, 950,
            955, 960,
            959
        ]
    },
    {
        vertex: 950,
        connexions: [
            951, 962
        ]
    },
    {
        vertex: 951,
        connexions: [
            952, 950
        ]
    },
    {
        vertex: 952,
        connexions: [
            951, 953
        ]
    },
    {
        vertex: 953,
        connexions: [
            952, 954
        ]
    },
    {
        vertex: 954,
        connexions: [
            953, 955
        ]
    },
    {
        vertex: 955,
        connexions: [
            954, 956,
            962, 961
        ]
    },
    {
        vertex: 956,
        connexions: [
            955, 957
        ]
    },
    {
        vertex: 957,
        connexions: [
            956, 958
        ]
    },
    {
        vertex: 958,
        connexions: [
            957, 959
        ]
    },
    {
        vertex: 959,
        connexions: [
            958, 960,
            961
        ]
    },
    {
        vertex: 960,
        connexions: [
            959, 951
        ]
    },
    {
        vertex: 520,
        connexions: [
            522, 521,
            510, 305

        ]
    },
    {
        vertex: 522,
        connexions: [
            520, 523,
            524, 545
        ]
    },
    {
        vertex: 523,
        connexions: [
            522
        ]
    },
    {
        vertex: 545,
        connexions: [
            522, 547,
            546, 530
        ]
    },
    {
        vertex: 547,
        connexions: [
            545
        ]
    },
    {
        vertex: 546,
        connexions: [
            545
        ]
    },
    {
        vertex: 525,
        connexions: [
            524
        ]
    },
    {
        vertex: 526,
        connexions: [
            524
        ]
    },
    {
        vertex: 527,
        connexions: [
            524
        ]
    },
    {
        vertex: 524,
        connexions: [
            522, 525,
            526, 527, 528
        ]
    },
    {
        vertex: 528,
        connexions: [
            524, 529
        ]
    },
    {
        vertex: 548,
        connexions: [
            529, 549, 550
        ]
    },
    {
        vertex: 549,
        connexions: [
            548, 552, 550,
            'Exhibition Gallery 199'

        ]
    },
    {
        vertex: 554,
        connexions: [
            555, 553

        ]
    },
    {
        vertex: 553,
        connexions: [
            552, 554
        ]
    },
    {
        vertex: 555,
        connexions: [
            399, 556,
            554, 552
        ]
    },
    {
        vertex: 552,
        connexions: [
            555, 553, 549, 551
        ]
    },
    {
        vertex: 904,
        connexions: [
            903, 905
        ]
    },
    {
        vertex: 905,
        connexions: [
            904, 906
        ]
    },
    {
        vertex: 906,
        connexions: [
            905, 907
        ]
    },
    {
        vertex: 907,
        connexions: [
            906, 912
        ]
    },
    {
        vertex: 912,
        connexions: [
            913, 911, 907
        ]
    },
    {
        vertex: 903,
        connexions: [
            904, 902, 913, 916
        ]
    },
    {
        vertex: 902,
        connexions: [
            903, 901
        ]
    },
    {
        vertex: 913,
        connexions: [
            903, 912
        ]
    },
    {
        vertex: 911,
        connexions: [
            910, 912
        ]
    },
    {
        vertex: 910,
        connexions: [
            911, 908
        ]
    },
    {
        vertex: 908,
        connexions: [
            399, 909
        ]
    },
    {
        vertex: 909,
        connexions: [
            908, 900
        ]
    },
    {
        vertex: 900,
        connexions: [
            901, 909, 399
        ]
    },
    {
        vertex: 901,
        connexions: [
            900, 902
        ]
    },
    {
        vertex: 399,
        connexions: [
            356, 354, 908, 900, 358, 555
        ]
    },
    {
        vertex: 354,
        connexions: [
            399, 162,
            353, 356
        ]
    },
    {
        vertex: 356,
        connexions: [
            354, 357
        ]
    },
    {
        vertex: 357,
        connexions: [
            356, 358
        ]
    },
    {
        vertex: 358,
        connexions: [
            357, 359, 550
        ]
    },
    {
        vertex: 359,
        connexions: [
            358, 350
        ]
    },
    {
        vertex: 350,
        connexions: [
            359, 351,
            352, 550, 161
        ]
    },
    {
        vertex: 352,
        connexions: [
            350, 353
        ]
    },
    {
        vertex: 351,
        connexions: [
            350
        ]
    },
    {
        vertex: 353,
        connexions: [
            354, 352
        ]
    },
    {
        vertex: 533,
        connexions: [
            532, 538
        ]
    },
    {
        vertex: 532,
        connexions: [
            533, 531
        ]
    },
    {
        vertex: 531,
        connexions: [
            532, 529
        ]
    },
    {
        vertex: 539,
        connexions: [
            540, 538
        ]
    },
    {
        vertex: 540,
        connexions: [
            539, 541, 542
        ]
    },
    {
        vertex: 541,
        connexions: [
            540, 537, 304
        ]
    },
    {
        vertex: 538,
        connexions: [
            533, 539, 540, 537
        ]
    },
    {
        vertex: 537,
        connexions: [
            541, 538, 536
        ]
    },
    {
        vertex: 536,
        connexions: [
            537, 300, 534
        ]
    },
    {
        vertex: 534,
        connexions: [
            "Thomas J. Watson Library",
            536, 300
        ]
    },
    {
        vertex: "Thomas J. Watson Library",
        connexions: [
            534
        ]
    },
    {
        vertex: 303,
        connexions: [
            300, 301, 304
        ]
    },
    {
        vertex: 300,
        connexions: [
            304, "The Great Hall",
            534, 536, 303, 302
        ]
    },
    {
        vertex: 302,
        connexions: [
            300, 301
        ]
    },
    {
        vertex: 301,
        connexions: [
            302, 303, 304
        ]
    },
    {
        vertex: 304,
        connexions: [
            541, 300, 303,
            301, 500, 305,
            599
        ]
    },
    {
        vertex: 305,
        connexions: [
            306, 544, 304, 509
        ]
    },
    {
        vertex: 550,
        connexions: [
            359, 556, 551, 548,
            "Exhibition Gallery 199"
        ]
    },
    {
        vertex: "Exhibition Gallery 199",
        connexions: [
            550, 157
        ]
    },
    {
        vertex: 157,
        connexions: [
            159, 153, 155
        ]
    },
    {
        vertex: 155,
        connexions: [
            153, 157, 151
        ]
    },
    {
        vertex: 151,
        connexions: [
            155, 150
        ]
    },
    {
        vertex: 159,
        connexions: [
            161, 153
        ]
    },
    {
        vertex: 551,
        connexions: [
            552, 556, 550
        ]
    },
    {
        vertex: 556,
        connexions: [
            551, 550, 555
        ]
    },
    {
        vertex: 542,
        connexions: [
            540, 543
        ]
    },
    {
        vertex: 543,
        connexions: [
            544, 542
        ]
    },
    {
        vertex: 529,
        connexions: [
            548, 528, 530, 531
        ]
    },
    {
        vertex: 530,
        connexions: [
            544, 529
        ]
    },
    {
        vertex: 544,
        connexions: [
            545, 530, 543, 305
        ]
    },
    {
        vertex: 169,
        connexions: [
            168, 162
        ]
    },
    {
        vertex: 168,
        connexions: [
            169, 167, 166, 165, 164, 162
        ]
    },
    {
        vertex: 167,
        connexions: [
            168, 166, 162, 169
        ]
    },
    {
        vertex: 166,
        connexions: [
            168, 167, 165, 164, 162
        ]
    },
    {
        vertex: 165,
        connexions: [
            165, 164, 166
        ]
    },
    {
        vertex: 164,
        connexions: [
            166, 168, 167, 169, 162, 163
        ]
    },
    {
        vertex: 162,
        connexions: [
            169, 164,
            166, 168, 160,
            353, 354
        ]
    },
    {
        vertex: 161,
        connexions: [
            350, 160, 159
        ]
    },
    {
        vertex: 160,
        connexions: [
            161, 162, 153, 158
        ]
    },
    {
        vertex: 163,
        connexions: [
            164
        ]
    },
    {
        vertex: 158,
        connexions: [
            160, 153, 156
        ]
    },
    {
        vertex: 153,
        connexions: [
            150, 155, 157, 159, 160,
            158, 156, 154
        ]
    },
    {
        vertex: 156,
        connexions: [
            153, 158, 154
        ]
    },
    {
        vertex: 154,
        connexions: [
            153, 156, 152
        ]
    },
    {
        vertex: 150,
        connexions: [
            "The Great Hall",
            151, 153, 152
        ]
    },
    {
        vertex: 152,
        connexions: [
            150, 154
        ]
    },
    {
        vertex: "774a",
        connexions: [
            707, 774
        ]
    },
    {
        vertex: 707,
        connexions: [
            "774a", 774, 706, 773
        ]
    },
    {
        vertex: 774,
        connexions: [
            707, 773
        ]
    },
    {
        vertex: 773,
        connexions: [
            774, 707
        ]
    },
    {
        vertex: 915,
        connexions: [
            914, 916
        ]
    },
    {
        vertex: 916,
        connexions: [
            915, 903
        ]
    },
    {
        vertex: 914,
        connexions: [
            915
        ]
    },
    {
        vertex: 170,
        connexions: [
            171, 172, 169, 458
        ]
    },
    {
        vertex: 171,
        connexions: [
            172, 170
        ]
    },
    {
        vertex: 172,
        connexions: [
            171, 170,
            450, 163
        ]
    },
    {
        vertex: 920,
        connexions: [
            919, 921
        ]
    },
    {
        vertex: 921,
        connexions: [
            920, 922
        ]
    },
    {
        vertex: 922,
        connexions: [
            921, 923
        ]
    },
    {
        vertex: 923,
        connexions: [
            922, 924
        ]
    },
    {
        vertex: 924,
        connexions: [
            923, 925
        ]
    },
    {
        vertex: 925,
        connexions: [
            924
        ]
    },
    {
        vertex: 919,
        connexions: [
            920, 918
        ]
    },
    {
        vertex: 918,
        connexions: [
            919, 917
        ]
    },
    {
        vertex: "Exhibition Galleries 999",
        connexions: [
            917
        ]
    },
    {
        vertex: 917,
        connexions: [
            918, 830, 800,
            "Exhibition Galleries 899",
            926,
            "Exhibition Galleries 999"
        ]
    },
    {
        vertex: 830,
        connexions: [
            917, 826,
            829, 828
        ]
    },
    {
        vertex: 826,
        connexions: [
            830, 825, 823
        ]
    },
    {
        vertex: 823,
        connexions: [
            826, 822, 820
        ]
    },
    {
        vertex: 820,
        connexions: [
            823, 819
        ]
    },
    {
        vertex: 828,
        connexions: [
            830, 829, 827
        ]
    },
    {
        vertex: 829,
        connexions: [
            830, 828, 827
        ]
    },
    {
        vertex: 827,
        connexions: [
            828, 829,
            824, 812
        ]
    },
    {
        vertex: 812,
        connexions: [
            827, 811,
            808, 807
        ]
    },
    {
        vertex: 808,
        connexions: [
            812, 807
        ]
    },
    {
        vertex: 807,
        connexions: [
            812, 808, 806
        ]
    },
    {
        vertex: 805,
        connexions: [
            806, 804
        ]
    },
    {
        vertex: 804,
        connexions: [
            805, 803, 454
        ]
    },
    {
        vertex: 806,
        connexions: [
            805, 807
        ]
    },
    {
        vertex: 803,
        connexions: [
            804, 802
        ]
    },
    {
        vertex: 802,
        connexions: [
            803, 801
        ]
    },
    {
        vertex: 801,
        connexions: [
            802, 800, 817
        ]
    },
    {
        vertex: 817,
        connexions: [
            816, 801
        ]
    },
    {
        vertex: 816,
        connexions: [
            817, 815
        ]
    },
    {
        vertex: 815,
        connexions: [
            816, 810, 814
        ]
    },
    {
        vertex: 814,
        connexions: [
            815, 813
        ]
    },
    {
        vertex: 813,
        connexions: [
            811, 814
        ]
    },
    {
        vertex: 811,
        connexions: [
            813, 810,
            812, 824
        ]
    },
    {
        vertex: 824,
        connexions: [
            827, 811,
            821, 825
        ]
    },
    {
        vertex: 821,
        connexions: [
            810, 818,
            822, 824
        ]
    },
    {
        vertex: 810,
        connexions: [
            821, 809,
            815, 811
        ]
    },
    {
        vertex: 809,
        connexions: [
            810, 800
        ]
    },
    {
        vertex: 818,
        connexions: [
            821, 819
        ]
    },
    {
        vertex: 819,
        connexions: [
            820, 800,
            818, 822
        ]
    },
    {
        vertex: 822,
        connexions: [
            823, 819,
            821, 825
        ]
    },
    {
        vertex: 825,
        connexions: [
            826, 822, 824
        ]
    },
    {
        vertex: 800,
        connexions: [
            917, 850,
            851, 175
        ]
    },
    {
        vertex: 458,
        connexions: [
            454, 170
        ]
    },
    {
        vertex: 454,
        connexions: [
            804, 458,
            455, 453
        ]
    },
    {
        vertex: 453,
        connexions: [
            454, 451, 452
        ]
    },
    {
        vertex: 452,
        connexions: [
            453
        ]
    },
    {
        vertex: 451,
        connexions: [
            450, 452, 453
        ]
    },
    {
        vertex: 450,
        connexions: [
            451, 176,
            463, 457
        ]
    },
    {
        vertex: 457,
        connexions: [
            450, 463, 456
        ]
    },
    {
        vertex: 456,
        connexions: [
            457, 455
        ]
    },
    {
        vertex: 455,
        connexions: [
            454, 459,
            460, 462, 456
        ]
    },
    {
        vertex: 459,
        connexions: [
            460, 455
        ]
    },
    {
        vertex: 460,
        connexions: [
            459, 455, 461
        ]
    },
    {
        vertex: 461,
        connexions: [
            460
        ]
    },
    {
        vertex: 462,
        connexions: [
            455, 463
        ]
    },
    {
        vertex: 463,
        connexions: [
            462, 457,
            450, 464
        ]
    },
    {
        vertex: 464,
        connexions: [
            176, 463
        ]
    },
    {
        vertex: 176,
        connexions: [
            450, 464, 175
        ]
    },
    {
        vertex: 175,
        connexions: [
            176, 800, 174
        ]
    },
    {
        vertex: 174,
        connexions: [
            175, 173
        ]
    },
    {
        vertex: 173,
        connexions: [
            174, 406
        ]
    },
    {
        vertex: 406,
        connexions: [
            173, 400
        ]
    },
    {
        vertex: 400,
        connexions: [
            406, 401,
            202, 203
        ]
    },
    {
        vertex: 403,
        connexions: [
            405, 402
        ]
    },
    {
        vertex: 405,
        connexions: [
            450, 176, 464
        ]
    },
    {
        vertex: 402,
        connexions: [
            403, 401, 203
        ]
    },
    {
        vertex: 401,
        connexions: [
            402, 400
        ]
    },
    {
        vertex: 203,
        connexions: [
            400, 402,
            202, 204
        ]
    },
    {
        vertex: 202,
        connexions: [
            400, 203,
            205, 201,
            200
        ]
    },
    {
        vertex: 204,
        connexions: [
            203, 402,
            205, 206
        ]
    },
    {
        vertex: 205,
        connexions: [
            206, 202,
            204, 201
        ]
    },
    {
        vertex: 206,
        connexions: [
            205, 234,
            207
        ]
    },
    {
        vertex: 233,
        connexions: [
            207, 234
        ]
    },
    {
        vertex: 207,
        connexions: [
            206, 233,
            208, 209
        ]
    },
    {
        vertex: 208,
        connexions: [
            207, 236
        ]
    },
    {
        vertex: 234,
        connexions: [
            206, 233, 235
        ]
    },
    {
        vertex: 235,
        connexions: [
            234, 236
        ]
    },
    {
        vertex: 236,
        connexions: [
            235, 208, 237
        ]
    },
    {
        vertex: 237,
        connexions: [
            236, 238
        ]
    },
    {
        vertex: 238,
        connexions: [
            237, 239
        ]
    },
    {
        vertex: 239,
        connexions: [
            238, 240
        ]
    },
    {
        vertex: 240,
        connexions: [
            239, 241,
            242
        ]
    },
    {
        vertex: 241,
        connexions: [
            209, 612,
            244, 242,
            240
        ]
    },
    {
        vertex: 242,
        connexions: [
            240, 241, 243
        ]
    },
    {
        vertex: 243,
        connexions: [
            242, 251
        ]
    },
    {
        vertex: 244,
        connexions: [
            241, 247,
            245
        ]
    },
    {
        vertex: 245,
        connexions: [
            244, 247,
            246
        ]
    },
    {
        vertex: 246,
        connexions: [
            248, 247, 245
        ]
    },
    {
        vertex: 246,
        connexions: [
            247, 245, 248
        ]
    },
    {
        vertex: 247,
        connexions: [
            244, 245,
            246, 248
        ]
    },
    {
        vertex: 248,
        connexions: [
            246, 249
        ]
    },
    {
        vertex: 249,
        connexions: [
            248, 250,
            214, 213
        ]
    },
    {
        vertex: 250,
        connexions: [
            249
        ]
    },
    {
        vertex: 213,
        connexions: [
            249, 214,
            211
        ]
    },
    {
        vertex: 211,
        connexions: [
            212, 210, 213, 219
        ]
    },
    {
        vertex: 212,
        connexions: [
            211
        ]
    },
    {
        vertex: 210,
        connexions: [
            211, 218,
            217, 209
        ]
    },
    {
        vertex: 209,
        connexions: [
            210, 217,
            241, 207,
            223
        ]
    },
    {
        vertex: 217,
        connexions: [
            210, 218,
            215, 209
        ]
    },
    {
        vertex: 218,
        connexions: [
            210, 217,
            214
        ]
    },
    {
        vertex: 214,
        connexions: [
            249, 218,
            215
        ]
    },
    {
        vertex: 215,
        connexions: [
            214, 217, 216
        ]
    },
    {
        vertex: 216,
        connexions: [
            215, 209,
            241
        ]
    },
    {
        vertex: 223,
        connexions: [
            209, 224,
            232
        ]
    },
    {
        vertex: 232,
        connexions: [
            223, 231
        ]
    },
    {
        vertex: 224,
        connexions: [
            223, 225
        ]
    },
    {
        vertex: 231,
        connexions: [
            232, 230
        ]
    },
    {
        vertex: 230,
        connexions: [
            231, 229
        ]
    },
    {
        vertex: 229,
        connexions: [
            230, 228
        ]
    },
    {
        vertex: 228,
        connexions: [
            227, 226
        ]
    },
    {
        vertex: 227,
        connexions: [
            228, 703
        ]
    },
    {
        vertex: 226,
        connexions: [
            228, 682,
            225
        ]
    },
    {
        vertex: 225,
        connexions: [
            682, 224,
            226
        ]
    },
    {
        vertex: 682,
        connexions: [
            226, 683,
            681
        ]
    },
    {
        vertex: 683,
        connexions: [
            684, 682
        ]
    },
    {
        vertex: 681,
        connexions: [
            682, 680
        ]
    },
    {
        vertex: 680,
        connexions: [
            681, 618,
            684
        ]
    },
    {
        vertex: 684,
        connexions: [
            680, 683,
            704
        ]
    },
    {
        vertex: 618,
        connexions: [
            680, 617,
            621, 619
        ]
    },
    {
        vertex: 619,
        connexions: [
            618, 620
        ]
    },
    {
        vertex: 620,
        connexions: [
            619, 621,
            622
        ]
    },
    {
        vertex: 622,
        connexions: [
            600, 623,
            620
        ]
    },
    {
        vertex: 600,
        connexions: [
            200, 201,
            622, 601,
            644
        ]
    },
    {
        vertex: 601,
        connexions: [
            625, 602,
            623, 600,
            641
        ]
    },
    {
        vertex: 625,
        connexions: [
            626, 601
        ]
    },
    {
        vertex: 626,
        connexions: [
            625, 627
        ]
    },
    {
        vertex: 627,
        connexions: [
            626, 607
        ]
    },
    {
        vertex: 641,
        connexions: [
            601, 644,
            640
        ]
    },
    {
        vertex: 640,
        connexions: [
            641, 639
        ]
    },
    {
        vertex: 639,
        connexions: [
            640, 642,
            638
        ]
    },
    {
        vertex: 638,
        connexions: [
            637, 639,
            642
        ]
    },
    {
        vertex: 642,
        connexions: [
            638, 639,
            643
        ]
    },
    {
        vertex: 643,
        connexions: [
            642, 644
        ]
    },
    {
        vertex: 644,
        connexions: [
            600, 641,
            643
        ]
    },
    {
        vertex: 637,
        connexions: [
            638, 635
        ]
    },
    {
        vertex: 635,
        connexions: [
            634, 636,
            637
        ]
    },
    {
        vertex: 636,
        connexions: [
            635
        ]
    },
    {
        vertex: 634,
        connexions: [
            635, 633
        ]
    },
    {
        vertex: 633,
        connexions: [
            634, 632
        ]
    },
    {
        vertex: 632,
        connexions: [
            633, 631
        ]
    },
    {
        vertex: 631,
        connexions: [
            632, 629,
            630
        ]
    },
    {
        vertex: 630,
        connexions: [
            631, 628
        ]
    },
    {
        vertex: 629,
        connexions: [
            631, 628
        ]
    },
    {
        vertex: 628,
        connexions: [
            630, 629,
            608, 607
        ]
    },
    {
        vertex: 608,
        connexions: [
            628, 609,
            607
        ]
    },
    {
        vertex: 609,
        connexions: [
            608, 607,
            610, 611
        ]
    },
    {
        vertex: 610,
        connexions: [
            609, 611,
            612
        ]
    },
    {
        vertex: 612,
        connexions: [
            610, 613
        ]
    },
    {
        vertex: 607,
        connexions: [
            609, 608,
            628, 627,
            606
        ]
    },
    {
        vertex: 606,
        connexions: [
            607, 603
        ]
    },
    {
        vertex: 603,
        connexions: [
            602, 606
        ]
    },
    {
        vertex: 602,
        connexions: [
            603, 601
        ]
    },
    {
        vertex: 623,
        connexions: [
            624, 621,
            622, 601
        ]
    },
    {
        vertex: 621,
        connexions: [
            618, 620,
            623
        ]
    },
    {
        vertex: 624,
        connexions: [
            604, 602,
            623
        ]
    },
    {
        vertex: 604,
        connexions: [
            603, 605
        ]
    },
    {
        vertex: 605,
        connexions: [
            604, 605, 616
        ]
    },
    {
        vertex: 616,
        connexions: [
            605, 615
        ]
    },
    {
        vertex: 615,
        connexions: [
            614, 617
        ]
    },
    {
        vertex: 617,
        connexions: [
            615, 618
        ]
    },
    {
        vertex: 614,
        connexions: [
            613, 615,
            705
        ]
    },
    {
        vertex: 613,
        connexions: [
            612, 611,
            614
        ]
    },
    {
        vertex: 611,
        connexions: [
            609, 610,
            613
        ]
    },
    {
        vertex: 705,
        connexions: [
            614, 706,
            704
        ]
    },
    {
        vertex: 706,
        connexions: [
            705, 772, 707
        ]
    },
    {
        vertex: 722,
        connexions: [
            769, 771,
            717, 706,
            708
        ]
    },
    {
        vertex: 769,
        connexions: [
            768, 770,
            772
        ]
    },
    {
        vertex: 768,
        connexions: [
            766, 769
        ]
    },
    {
        vertex: 766,
        connexions: [
            765, 768
        ]
    },
    {
        vertex: 765,
        connexions: [
            766, 764,
            767
        ]
    },
    {
        vertex: 764,
        connexions: [
            765, 763
        ]
    },
    {
        vertex: 763,
        connexions: [
            764, 762
        ]
    },
    {
        vertex: 762,
        connexions: [
            763, 760,
            761
        ]
    },
    {
        vertex: 767,
        connexions: [
            765, 760,
            770
        ]
    },
    {
        vertex: 760,
        connexions: [
            762, 758,
            767
        ]
    },
    {
        vertex: 770,
        connexions: [
            767, 769,
            771
        ]
    },
    {
        vertex: 771,
        connexions: [
            772, 770,
            758
        ]
    },
    {
        vertex: 758,
        connexions: [
            760, 759,
            755, 771
        ]
    },
    {
        vertex: 761,
        connexions: [
            762, 759
        ]
    },
    {
        vertex: 759,
        connexions: [
            761, 758,
            756
        ]
    },
    {
        vertex: 755,
        connexions: [
            758, 753,
            756
        ]
    },
    {
        vertex: 756,
        connexions: [
            759, 757,
            752, 755
        ]
    },
    {
        vertex: 757,
        connexions: [
            756
        ]
    },
    {
        vertex: 755,
        connexions: [

        ]
    },
    {
        vertex: 753,
        connexions: [
            754, 755,
            752, 748
        ]
    },
    {
        vertex: 754,
        connexions: [
            753
        ]
    },
    {
        vertex: 752,
        connexions: [
            751, 756,
            753
        ]
    },
    {
        vertex: 751,
        connexions: [
            752, 750
        ]
    },
    {
        vertex: 750,
        connexions: [
            751, 749
        ]
    },
    {
        vertex: 749,
        connexions: [
            750, 748
        ]
    },
    {
        vertex: 748,
        connexions: [
            749, 753,
            747
        ]
    },
    {
        vertex: 747,
        connexions: [
            703, 748
        ]
    },
    {
        vertex: 703,
        connexions: [
            704, 747, 708
        ]
    },
    {
        vertex: 704,
        connexions: [
            703, 684,
            705
        ]
    },
    {
        vertex: 772,
        connexions: [
            769, 771,
            717, 706
        ]
    },
    {
        vertex: 717,
        connexions: [
            772, 704,
            718, 719
        ]
    },
    {
        vertex: 718,
        connexions: [
            717, 719
        ]
    },
    {
        vertex: 719,
        connexions: [
            718, 717,
            720
        ]
    },
    {
        vertex: 720,
        connexions: [
            719, 721
        ]
    },
    {
        vertex: 721,
        connexions: [
            720, 717
        ]
    },
    {
        vertex: 722,
        connexions: [
            717
        ]
    },
    {
        vertex: 200,
        connexions: [
            202, 600,
            201
        ]
    },
    {
        vertex: 201,
        connexions: [
            600, 202,
            200
        ]
    },
    {
        vertex: 690,
        connexions: [
            850, 535,
            200, 201
        ]
    },
    {
        vertex: 535,
        connexions: [
            850
        ]
    },
    {
        vertex: 505,
        connexions: [
            690
        ]
    },
    {
        vertex: 850,
        connexions: [
            690, 851,
            800, 693,
            692, 691
        ]
    },
    {
        vertex: 851,
        connexions: [
            850, 800
        ]
    },
    {
        vertex: 693,
        connexions: [
            852, 850
        ]
    },
    {
        vertex: 692,
        connexions: [
            850
        ]
    },
    {
        vertex: 691,
        connexions: [
            850
        ]
    },
    {
        vertex: 852,
        connexions: [
            800, 693
        ]
    },
    {
        vertex: "Exhibition Galleries 899",
        connexions: [
            917
        ]
    },
    {
        vertex: 714,
        connexions: [
            713
        ]
    },
    {
        vertex: 712,
        connexions: [
            713, 711
        ]
    },
    {
        vertex: 713,
        connexions: [
            714, 714,
            710, 708,
            716, 715
        ]
    },
    {
        vertex: 715,
        connexions: [
            713
        ]
    },
    {
        vertex: 711,
        connexions: [
            710, 712
        ]
    },
    {
        vertex: 716,
        connexions: [
            713
        ]
    },
    {
        vertex: 710,
        connexions: [
            711, 713,
            709
        ]
    },
    {
        vertex: 708,
        connexions: [
            713, 709, 722, 709
        ]
    },
    {
        vertex: 709,
        connexions: [
            708, 710, 708
        ]
    },
    {
        vertex: 219,
        connexions: [
            220, 211
        ]
    },
    {
        vertex: 220,
        connexions: [
            219, 221
        ]
    },
    {
        vertex: 221,
        connexions: [
            220, 222
        ]
    },
    {
        vertex: 222,
        connexions: [
            221
        ]
    },
    {
        vertex: 253,
        connexions: [
            251, 252
        ]
    },
    {
        vertex: 251,
        connexions: [
            253, 252, 243
        ]
    },
    {
        vertex: 252,
        connexions: [
            251, 253
        ]
    },
    {
        vertex: 926,
        connexions: [
            917, "Exhibition Gallery 999"
        ]
    },
    {
        vertex: "Exhibition Gallery 999",
        connexions: [
            917, 926
        ]
    },
    {
        vertex: 599,
        connexions: [
            "Antonio Ratti Textile Center", 304
        ]
    },
    {
        vertex: "Antonio Ratti Textile Center",
        connexions: [
            599
        ]
    },
    {
        vertex: 961,
        connexions: [
            962, 959
        ]
    },

]


const floorConnexions = [
    {
        vertex: 963,
        connexions: [
            961, 962
        ], // This are only the up connexions
        down: null
    },
    {
        vertex: 981,
        connexions: [
            132
        ], // This are only the up connexions
        down: null
    },
    {
        vertex: 599,
        connexions: [
            304
        ], // This are only the up connexions
        down: null
    },
    {
        vertex: 702,
        connexions: [
            773
        ], // This are only the up connexions
        down: null
    },
    {
        vertex: 903,
        connexions: [
            915
        ], // This are only the up connexions
        down: null
    },
    {
        vertex: 912,
        connexions: [
            915
        ], // This are only the up connexions
        down: null
    },
    {
        vertex: 169,
        connexions: [
            170
        ], // This are only the up connexions
        down: null
    },
    {
        vertex: 163,
        connexions: [
            172
        ], // This are only the up connexions
        down: null
    },
    {
        vertex: 915,
        connexions: [
            920, 925
        ], // This are only the up connexions
        down: [
            903, 912
        ]
    },
    {
        vertex: 98,
        connexions: [
            132
        ], // This are only the up connexions
        down: null
    },
    {
        vertex: 172,
        connexions: [
            450
        ], // This are only the up connexions
        down: [
            163
        ]
    },
    {
        vertex: 707,
        connexions: [
            706
        ], // This are only the up connexions
        down: null
    },
    {
        vertex: 717,
        connexions: [
            713
        ], // This are only the up connexions
        down: null
    },
    {
        vertex: 753,
        connexions: [
            710
        ], // This are only the up connexions
        down: null
    },
    {
        vertex: 214,
        connexions: [
            222
        ], // This are only the up connexions
        down: null
    },
    {
        vertex: 917,
        connexions: [
            926
        ], // This are only the up connexions
        down: null
    },

]

export default museumMatrix 