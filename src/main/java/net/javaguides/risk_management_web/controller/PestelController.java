package net.javaguides.risk_management_web.controller;

import net.javaguides.risk_management_web.entity.Pestel;
import net.javaguides.risk_management_web.service.PestelService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/projects/{projectId}/pestel")
@CrossOrigin
public class PestelController {

    private final PestelService service;

    public PestelController(PestelService service) {
        this.service = service;
    }

    @PostMapping
    public Pestel save(@PathVariable Long projectId,
                       @RequestBody Pestel pestel) {
        return service.save(projectId, pestel);
    }

    @GetMapping
    public Pestel get(@PathVariable Long projectId) {
        return service.getByProject(projectId);
    }
}
