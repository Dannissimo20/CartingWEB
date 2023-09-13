using CartingLibrary;
using CartingLibrary.Repository;
using Microsoft.AspNetCore.Mvc;

namespace ASPServer
{
    [Route("achiev")]
    [ApiController]
    public class AchievController
    {
        private readonly IClientRepository _clientRepository;
        private readonly ITrackRepository _trackRepository;
        private readonly IRaceRepository _raceRepository;
        public AchievController(IClientRepository clientRepository, ITrackRepository trackRepository, IRaceRepository raceRepository)
        {
            _clientRepository = clientRepository;
            _trackRepository = trackRepository;
            _raceRepository = raceRepository;
        }

        [HttpGet("get")]
        public IEnumerable<AchievmentModel> GetAchievments()
        {
            IEnumerable<AchievmentModel> am1;
            List<AchievmentModel> am = new List<AchievmentModel>();
            Client client = _clientRepository.GetClientById(101);
            IEnumerable<Track> tracks = _trackRepository.GetTracks();
            foreach (var item in tracks)
            {
                Race raceBestLap = _raceRepository.GetBestLapForClientAndTrack(client, item);
                Race raceMaxSpeed = _raceRepository.GetMaxSpeedForClientAndTrack(client, item);
                AchievmentModel achiev = null;
                if (raceBestLap == null || raceMaxSpeed == null)
                    achiev = new AchievmentModel(item.ID, "00:00:00", 0, "-", "-");
                else
                    achiev = new AchievmentModel(item.ID, raceBestLap.BestLap.ToString(), raceMaxSpeed.MaxSpeed, raceBestLap.Date, raceMaxSpeed.Date);
                am.Add(achiev);
            }
            am1 = am;
            return am1;
        }
    }
}
