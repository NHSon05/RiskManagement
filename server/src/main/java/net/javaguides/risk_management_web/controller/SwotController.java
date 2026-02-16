package net.javaguides.risk_management_web.controller;

import net.javaguides.risk_management_web.entity.Swot;
import net.javaguides.risk_management_web.service.SwotService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/projects/{projectId}/swot")
@CrossOrigin
public class SwotController {

    private final SwotService service;

    public SwotController(SwotService service) {
        this.service = service;
    }

    @PostMapping
    public Swot save(@PathVariable Long projectId,
                     @RequestBody Swot swot) {
        return service.save(projectId, swot);
    }

    @GetMapping
    public Swot get(@PathVariable Long projectId) {
        return service.getByProject(projectId);
    }
}
