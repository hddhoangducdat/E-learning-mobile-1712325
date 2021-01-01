"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Report1608677080486 = void 0;
class Report1608677080486 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
        insert into public.report (subject, "userId", "courseId", status, "createdAt") values ('Crotalus cerastes', 26, 11, 'PENDING', '2020-08-22 06:50:37');
insert into public.report (subject, "userId", "courseId", status, "createdAt") values ('Lutra canadensis', 103, 10, 'SOLVED', '2020-06-26 11:57:26');
insert into public.report (subject, "userId", "courseId", status, "createdAt") values ('Papio cynocephalus', 64, 12, 'SOLVED', '2020-07-05 20:56:51');
insert into public.report (subject, "userId", "courseId", status, "createdAt") values ('Nannopterum harrisi', 95, 27, 'PENDING', '2020-02-05 08:23:13');
insert into public.report (subject, "userId", "courseId", status, "createdAt") values ('Aquila chrysaetos', 23, 28, 'PENDING', '2020-02-28 10:34:45');
insert into public.report (subject, "userId", "courseId", status, "createdAt") values ('Gyps bengalensis', 36, 24, 'SOLVED', '2020-02-05 07:26:02');
insert into public.report (subject, "userId", "courseId", status, "createdAt") values ('Anhinga rufa', 61, 18, 'PENDING', '2020-04-18 01:22:29');
insert into public.report (subject, "userId", "courseId", status, "createdAt") values ('Dasypus novemcinctus', 116, 2, 'SOLVED', '2020-06-23 12:36:44');
insert into public.report (subject, "userId", "courseId", status, "createdAt") values ('Dendrocitta vagabunda', 114, 23, 'SOLVED', '2020-02-09 07:01:54');
insert into public.report (subject, "userId", "courseId", status, "createdAt") values ('Chauna torquata', 97, 23, 'SOLVED', '2019-12-22 13:58:52');
insert into public.report (subject, "userId", "courseId", status, "createdAt") values ('Paroaria gularis', 72, 19, 'PENDING', '2020-05-30 21:57:11');
insert into public.report (subject, "userId", "courseId", status, "createdAt") values ('Neotis denhami', 71, 29, 'SOLVED', '2020-11-10 18:51:51');
insert into public.report (subject, "userId", "courseId", status, "createdAt") values ('Chlidonias leucopterus', 76, 13, 'SOLVED', '2020-09-20 20:15:23');
insert into public.report (subject, "userId", "courseId", status, "createdAt") values ('Carduelis uropygialis', 51, 13, 'PENDING', '2020-06-05 13:12:56');
insert into public.report (subject, "userId", "courseId", status, "createdAt") values ('Vulpes chama', 103, 16, 'PENDING', '2019-12-29 23:09:26');
insert into public.report (subject, "userId", "courseId", status, "createdAt") values ('Phalacrocorax niger', 74, 18, 'SOLVED', '2020-03-03 19:49:25');
insert into public.report (subject, "userId", "courseId", status, "createdAt") values ('Colaptes campestroides', 116, 2, 'SOLVED', '2020-05-18 07:57:00');
insert into public.report (subject, "userId", "courseId", status, "createdAt") values ('Lorythaixoides concolor', 94, 29, 'PENDING', '2020-08-16 01:54:37');
insert into public.report (subject, "userId", "courseId", status, "createdAt") values ('Libellula quadrimaculata', 45, 10, 'SOLVED', '2020-10-13 15:34:02');
insert into public.report (subject, "userId", "courseId", status, "createdAt") values ('Nyctanassa violacea', 107, 15, 'PENDING', '2020-08-30 03:14:57');
insert into public.report (subject, "userId", "courseId", status, "createdAt") values ('Gyps bengalensis', 117, 4, 'PENDING', '2020-08-04 13:49:02');
insert into public.report (subject, "userId", "courseId", status, "createdAt") values ('Manouria emys', 28, 8, 'SOLVED', '2020-08-28 22:31:54');
insert into public.report (subject, "userId", "courseId", status, "createdAt") values ('Anhinga rufa', 111, 15, 'PENDING', '2020-01-31 20:09:16');
insert into public.report (subject, "userId", "courseId", status, "createdAt") values ('Crocuta crocuta', 72, 15, 'SOLVED', '2020-06-15 10:30:32');
insert into public.report (subject, "userId", "courseId", status, "createdAt") values ('Chordeiles minor', 47, 4, 'SOLVED', '2020-02-18 02:44:25');
insert into public.report (subject, "userId", "courseId", status, "createdAt") values ('Bos frontalis', 55, 9, 'PENDING', '2020-04-13 04:51:25');
insert into public.report (subject, "userId", "courseId", status, "createdAt") values ('Bubulcus ibis', 31, 3, 'SOLVED', '2020-09-21 06:09:47');
insert into public.report (subject, "userId", "courseId", status, "createdAt") values ('Ctenophorus ornatus', 91, 17, 'SOLVED', '2020-08-15 04:52:31');
insert into public.report (subject, "userId", "courseId", status, "createdAt") values ('Bucorvus leadbeateri', 117, 25, 'SOLVED', '2020-03-09 17:36:27');
insert into public.report (subject, "userId", "courseId", status, "createdAt") values ('Pycnonotus nigricans', 79, 1, 'PENDING', '2020-05-13 05:02:26');
insert into public.report (subject, "userId", "courseId", status, "createdAt") values ('Cynomys ludovicianus', 45, 2, 'SOLVED', '2020-12-09 17:38:57');
insert into public.report (subject, "userId", "courseId", status, "createdAt") values ('Ramphastos tucanus', 66, 1, 'PENDING', '2020-11-25 12:48:08');
insert into public.report (subject, "userId", "courseId", status, "createdAt") values ('unavailable', 23, 22, 'SOLVED', '2020-09-19 02:51:10');
insert into public.report (subject, "userId", "courseId", status, "createdAt") values ('Sitta canadensis', 98, 3, 'PENDING', '2020-05-21 23:08:02');
insert into public.report (subject, "userId", "courseId", status, "createdAt") values ('Larus sp.', 72, 15, 'PENDING', '2020-01-04 01:46:40');
insert into public.report (subject, "userId", "courseId", status, "createdAt") values ('Lutra canadensis', 89, 6, 'SOLVED', '2020-08-09 14:11:19');
insert into public.report (subject, "userId", "courseId", status, "createdAt") values ('Creagrus furcatus', 68, 7, 'SOLVED', '2020-06-24 22:22:54');
insert into public.report (subject, "userId", "courseId", status, "createdAt") values ('Leptoptilos crumeniferus', 38, 15, 'SOLVED', '2020-05-27 07:14:35');
insert into public.report (subject, "userId", "courseId", status, "createdAt") values ('Odocoileus hemionus', 95, 25, 'SOLVED', '2020-07-08 18:06:08');
insert into public.report (subject, "userId", "courseId", status, "createdAt") values ('Dasypus septemcincus', 35, 6, 'PENDING', '2020-12-02 10:05:56');
insert into public.report (subject, "userId", "courseId", status, "createdAt") values ('Dacelo novaeguineae', 60, 14, 'SOLVED', '2020-01-11 06:02:29');
insert into public.report (subject, "userId", "courseId", status, "createdAt") values ('Dicrostonyx groenlandicus', 105, 2, 'SOLVED', '2020-02-25 23:57:41');
insert into public.report (subject, "userId", "courseId", status, "createdAt") values ('Propithecus verreauxi', 31, 16, 'SOLVED', '2020-11-07 08:10:15');
insert into public.report (subject, "userId", "courseId", status, "createdAt") values ('Spizaetus coronatus', 69, 9, 'SOLVED', '2020-04-13 08:41:28');
insert into public.report (subject, "userId", "courseId", status, "createdAt") values ('Fregata magnificans', 95, 5, 'SOLVED', '2020-12-12 17:12:47');
insert into public.report (subject, "userId", "courseId", status, "createdAt") values ('Coracias caudata', 72, 6, 'SOLVED', '2020-04-08 04:24:50');
insert into public.report (subject, "userId", "courseId", status, "createdAt") values ('Psophia viridis', 115, 7, 'PENDING', '2020-02-17 03:31:17');
insert into public.report (subject, "userId", "courseId", status, "createdAt") values ('Mustela nigripes', 32, 21, 'PENDING', '2020-01-23 22:05:54');
insert into public.report (subject, "userId", "courseId", status, "createdAt") values ('Aonyx cinerea', 119, 6, 'PENDING', '2020-12-01 06:14:19');
insert into public.report (subject, "userId", "courseId", status, "createdAt") values ('Bison bison', 62, 13, 'SOLVED', '2020-08-06 07:47:53');
insert into public.report (subject, "userId", "courseId", status, "createdAt") values ('Coluber constrictor', 79, 13, 'PENDING', '2020-06-07 03:50:45');
insert into public.report (subject, "userId", "courseId", status, "createdAt") values ('Canis mesomelas', 104, 28, 'SOLVED', '2020-05-21 05:52:42');
insert into public.report (subject, "userId", "courseId", status, "createdAt") values ('Anastomus oscitans', 84, 17, 'SOLVED', '2020-08-16 03:48:12');
insert into public.report (subject, "userId", "courseId", status, "createdAt") values ('Hystrix cristata', 82, 26, 'PENDING', '2020-03-19 21:54:40');
insert into public.report (subject, "userId", "courseId", status, "createdAt") values ('Merops sp.', 85, 9, 'PENDING', '2020-05-18 02:16:35');
insert into public.report (subject, "userId", "courseId", status, "createdAt") values ('Bison bison', 29, 16, 'PENDING', '2020-08-21 06:17:00');
insert into public.report (subject, "userId", "courseId", status, "createdAt") values ('Taurotagus oryx', 27, 13, 'PENDING', '2020-06-13 19:38:14');
insert into public.report (subject, "userId", "courseId", status, "createdAt") values ('Loris tardigratus', 58, 29, 'SOLVED', '2019-12-23 11:01:53');
insert into public.report (subject, "userId", "courseId", status, "createdAt") values ('Erethizon dorsatum', 46, 12, 'SOLVED', '2020-02-18 21:08:03');
insert into public.report (subject, "userId", "courseId", status, "createdAt") values ('Axis axis', 111, 14, 'SOLVED', '2020-07-20 22:50:39');
insert into public.report (subject, "userId", "courseId", status, "createdAt") values ('Marmota flaviventris', 65, 1, 'PENDING', '2020-04-30 00:40:55');
insert into public.report (subject, "userId", "courseId", status, "createdAt") values ('Ratufa indica', 86, 12, 'PENDING', '2020-08-11 22:50:44');
insert into public.report (subject, "userId", "courseId", status, "createdAt") values ('Lemur catta', 87, 19, 'SOLVED', '2020-06-28 11:12:18');
insert into public.report (subject, "userId", "courseId", status, "createdAt") values ('Platalea leucordia', 32, 7, 'SOLVED', '2020-09-11 10:26:00');
insert into public.report (subject, "userId", "courseId", status, "createdAt") values ('Varanus albigularis', 65, 9, 'PENDING', '2020-10-08 01:41:05');
insert into public.report (subject, "userId", "courseId", status, "createdAt") values ('Macaca nemestrina', 90, 15, 'PENDING', '2020-06-04 05:54:40');
insert into public.report (subject, "userId", "courseId", status, "createdAt") values ('Nesomimus trifasciatus', 26, 10, 'PENDING', '2020-01-27 10:00:41');
insert into public.report (subject, "userId", "courseId", status, "createdAt") values ('Cervus elaphus', 113, 18, 'PENDING', '2020-11-28 12:34:45');
insert into public.report (subject, "userId", "courseId", status, "createdAt") values ('Nasua narica', 65, 10, 'SOLVED', '2020-04-14 16:40:13');
insert into public.report (subject, "userId", "courseId", status, "createdAt") values ('unavailable', 68, 1, 'PENDING', '2020-12-20 08:24:43');
insert into public.report (subject, "userId", "courseId", status, "createdAt") values ('Paroaria gularis', 94, 19, 'PENDING', '2020-06-09 23:55:08');
insert into public.report (subject, "userId", "courseId", status, "createdAt") values ('Cervus unicolor', 89, 2, 'PENDING', '2020-09-02 05:53:11');
insert into public.report (subject, "userId", "courseId", status, "createdAt") values ('Dusicyon thous', 38, 24, 'SOLVED', '2020-06-17 18:08:14');
insert into public.report (subject, "userId", "courseId", status, "createdAt") values ('Chelodina longicollis', 49, 6, 'SOLVED', '2020-09-22 14:12:31');
insert into public.report (subject, "userId", "courseId", status, "createdAt") values ('Centrocercus urophasianus', 104, 30, 'SOLVED', '2020-11-05 04:42:09');
insert into public.report (subject, "userId", "courseId", status, "createdAt") values ('Erethizon dorsatum', 93, 16, 'SOLVED', '2020-06-26 00:36:40');
insert into public.report (subject, "userId", "courseId", status, "createdAt") values ('Lasiodora parahybana', 33, 15, 'SOLVED', '2020-01-03 23:33:32');
insert into public.report (subject, "userId", "courseId", status, "createdAt") values ('Trichosurus vulpecula', 112, 7, 'PENDING', '2020-05-21 21:34:40');
insert into public.report (subject, "userId", "courseId", status, "createdAt") values ('Heloderma horridum', 41, 4, 'SOLVED', '2020-06-06 00:13:24');
insert into public.report (subject, "userId", "courseId", status, "createdAt") values ('Nesomimus trifasciatus', 105, 20, 'PENDING', '2020-08-15 02:02:55');
        `);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.Report1608677080486 = Report1608677080486;
//# sourceMappingURL=1608677080486-Report.js.map